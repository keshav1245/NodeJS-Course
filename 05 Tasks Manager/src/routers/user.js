const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

//USER MODEL END POINTS

//Create User
router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(201).send(e)
    }

})

//LOGGING IN USER

router.post('/users/login', async(req,res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken()
        // res.status(200).send({ user : user.getPublicProfile(), token})
        res.status(200).send({ user, token}) //will run toJSON as well
    }catch(e){
        console.log(e.message)
        res.status(400).send({"error" : e.message})
    }
})

//LOGOUT 
router.post('/users/logout', auth, async (req, res)=>{
    const {token} = req
    try{
        req.user.tokens = req.user.tokens.filter((t)=>{
            // console.log(t.token)
            // console.log(token)
            return t.token !== token
        })
        await req.user.save()
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

//LOGOUT ALL SESSIONS
router.post('/users/logoutall', auth , async (req, res) =>{
    try{
        const {user} = req;
        user.tokens = []
        await user.save()
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

//Fetching all the users
router.get('/users/me', auth, async(req, res)=>{
    
    res.send(req.user)
})

//Fetch user by ID
// router.get('/users/:id', async(req, res)=>{
//     const {id} = req.params
//     try{
//         const user = await User.findById(id)
//         if(!user){
//             return res.status(404).send({"error": "User with the requested id not found !"})
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
// })


//Updating an user
// router.patch('/users/:id', async(req, res)=>{

//     const allowed = ['name', 'email', 'password', 'age']
//     const update = Object.keys(req.body)
//     const isValidOperation = update.every((up)=>allowed.includes(up))

//     if(!isValidOperation){
//         return res.status(400).send({"error" : "Invalid Update !"})
//     }
//     try{

//         const {id} = req.params
//         const user = await User.findById(id);
//         //This bypasses mongoose middle ware for hashing password
//         // const user = await User.findByIdAndUpdate(id,req.body, {
//         //     new : true, // returns new user with the udate applied
//         //     runValidators : true
//         // })
//         if(!user){
//             return res.status(404).send()
//         }

//         update.forEach((key)=>{
//             user[key] = req.body[key]
//         })

//         await user.save()


//         res.status(200).send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

router.patch('/users/me',auth, async(req, res)=>{

    const allowed = ['name', 'email', 'password', 'age']
    const update = Object.keys(req.body)
    const isValidOperation = update.every((up)=>allowed.includes(up))

    if(!isValidOperation){
        return res.status(400).send({"error" : "Invalid Update !"})
    }
    try{

        // const {id} = req.params
        // const user = await User.findById(id);
        //This bypasses mongoose middle ware for hashing password
        // const user = await User.findByIdAndUpdate(id,req.body, {
        //     new : true, // returns new user with the udate applied
        //     runValidators : true
        // })
        // if(!user){
        //     return res.status(404).send()
        // }

        update.forEach((key)=>{
            req.user[key] = req.body[key]
        })

        await req.user.save()


        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

//USER DELETE

// router.delete('/users/:id', auth, async (req, res)=>{
//     try{
//         const {id} = req.params
//         const user = await User.findByIdAndDelete(id);
//         if(!user){
//             return res.status(404).send({"error": "User not found !"})
//         }
//         res.status(200).send(user)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

router.delete('/users/me', auth, async (req, res)=>{
    try{
        // const {id} = req.user._id
        // const user = await User.findByIdAndDelete(id);
        // if(!user){
        //     return res.status(404).send({"error": "User not found !"})
        // }
        await req.user.remove()
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = router