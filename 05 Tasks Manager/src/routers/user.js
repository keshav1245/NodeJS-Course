const express = require('express')
const router = new express.Router()
const User = require('../models/user')

//USER MODEL END POINTS

//Create User
router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    
    
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(201).send(e)
    }

})

//Fetching all the users
router.get('/users', async(req, res)=>{
    
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
})

//Fetch user by ID
router.get('/users/:id', async(req, res)=>{
    const {id} = req.params
    try{
        const user = await User.findById(id)
        if(!user){
            return res.status(404).send({"error": "User with the requested id not found !"})
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})


//Updating an user
router.patch('/users/:id', async(req, res)=>{

    const allowed = ['name', 'email', 'password', 'age']
    const update = Object.keys(req.body)
    const isValidOperation = update.every((up)=>allowed.includes(up))

    if(!isValidOperation){
        return res.status(400).send({"error" : "Invalid Update !"})
    }
    try{

        const {id} = req.params
        const user = await User.findByIdAndUpdate(id,req.body, {
            new : true, // returns new user with the udate applied
            runValidators : true
        })
        if(!user){
            return res.status(404).send()
        }

        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

//USER DELETE

router.delete('/users/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({"error": "User not found !"})
        }
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports = router