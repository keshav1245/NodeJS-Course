const express = require('express');
const cookieParser = require('cookie-parser')
require('./db/mongoose') 
const jwt = require('jsonwebtoken')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.get('/', async (req, res)=>{
    const JWT_ACCESS_TOKEN_SECRET = "1795c04ddb3efe0421a3f1db85ff1ec35a7e3a2a1efae0097131c7c5df76dd58032ea2c8e805b251bac5d7a0ad94d551f9506637e9f9a665b4b9b55bf579960e";
    if(req.cookies.authToken){
        const result = await jwt.verify(req.cookies.authToken, JWT_ACCESS_TOKEN_SECRET)
        res.send({authToken : req.cookies.authToken,result })
    }else{
        res.send("No Auth Token bro !")
    }
})

//Loading Task Router
const userRouter = require('./routers/user')
app.use(userRouter)

//Loading Task Router
const taskRouter = require('./routers/task')
app.use(taskRouter)

app.listen(port, ()=>{
    console.log("Server is up and running on port : "+port)
})

const Task = require('./models/task')
const User = require('./models/user')

// const main = async function(){
//     // const task = await Task.findById('62148d39cf3e399adcb582fa')
//     // await task.populate('owner')
//     // console.log(task)

//     const user = await User.findById('621488f62dd9449fccb9cc8f')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main();