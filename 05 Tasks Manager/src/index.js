const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

//USER MODEL END POINTS

//Create User
app.post('/users', (req, res)=>{
    const user = new User(req.body)
    user.save()
    .then(()=>{
        res.status(201)
        res.send(user)
    })
    .catch((err)=>{
        res.status(400)
        res.send(err)
    })
})

//Fetching all the users
app.get('/users',(req, res)=>{
    const users = User.find({})
    users
    .then((users)=>{
        res.send(users)
    })
    .catch((error)=>{
        res.status(500).send(error)
    })
})

//Fetch user by ID
app.get('/users/:id',(req, res)=>{
    const {id} = req.params
    const user = User.findById(id)
    user
    .then((userData)=>{
        if(!userData){
            return res.status(404).send({"error": "User with the requested id not found !"})
        }
        res.send(userData)
    })
    .catch((error)=>{
        res.status(500).send(error)
    })
})

//TASK MODEL END POINTS

// Create Task
app.post('/tasks', (req, res)=>{
    const task = new Task(req.body)
    task.save()
    .then(()=>{
        res.status(201)
        res.send(task)
    })
    .catch((err)=>{
        res.status(400)
        res.send(err)
    })
})

// Get all Tasks
app.get('/tasks', (req,res)=>{
    const tasks = Task.find({});
    tasks
    .then((data) => {
        if(!data){
            return res.status(404).send()
        }
        res.send(data)
    })
    .catch((error)=>{
        res.status(500).send(error)
    })
})

// Get Task by id
app.get('/tasks/:id',(req,res)=>{
    const {id} = req.params;
    const task = Task.findById(id)

    task
    .then((data)=>{
        if(!data){
            return res.status(404).send({"error": "User with the requested id not found !"})
        }
        res.send(data)

    })
    .catch((error)=>{
        res.status(500).send()
    })

})

app.listen(port, ()=>{
    console.log("Server is up and running on port : "+port)
})