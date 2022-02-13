const express = require('express')
const router = express.Router()
const Task = require('../models/task')

//TASK MODEL END POINTS

// Create Task
router.post('/tasks', async(req, res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

// Get all Tasks
router.get('/tasks', async (req,res)=>{
    try{
        const tasks = await Task.find({});
        if(!tasks || tasks.length == 0){
            return res.send(404).send({"error": "User with the requested id not found !"})
        }
        res.send(tasks)
    }catch(e){
        res.send(500).send(e)
    }
})

// Get Task by id
router.get('/tasks/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        const task = await Task.findById(id)
        if(!task){
            res.status(404).send({"error": "Task with the requested id not found !"})
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }

})

//Updating a Task!
router.patch('/tasks/:id', async(req, res)=>{
    const allowedTask = ['description', 'completed']
    const updateTask = Object.keys(req.body)
    const isAllowedTaskUpdate =  updateTask.every((task)=>allowedTask.includes(task))

    if(!isAllowedTaskUpdate){
        return res.status(400).send({"error" : "Invalid Task Update !"})
    }

    try{
        const {id} = req.params
        const task = await Task.findByIdAndUpdate(id, req.body, {
            new : true,
            runValidators : true
        })

        if(!task){
            return res.status(404).send({'error' : "Task Not Found!"})
        }

        res.status(200).send(task)
    }catch(e){
        res.status(400).send(e)
    }

})

//DELETING A TASK
router.delete('/tasks/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id)
        if(!task){
            return res.status(404).send({'error' : "Task Not found !"})
        }

        res.status(200).send(task)

    }catch(e){

        res.status(400).send(e)

    }
})

module.exports = router