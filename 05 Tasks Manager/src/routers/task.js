const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

//TASK MODEL END POINTS

// Create Task
router.post('/tasks', auth, async(req, res)=>{
    // const task = new Task(req.body)

    const task = new Task({...req.body, owner : req.user._id})
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

// Get /tasks - all Tasks
// GET /tasks?completed=true - show only completed tasks
// GET /tasks?limit=10 - limiting page results
// GET /tasks?limit=10&skip=0 - getting 10 results on page 0th

router.get('/tasks',auth, async (req,res)=>{
    try{

        //Way 1
        // const tasks = await Task.find({
        //     owner : req.user._id
        // });

        //Way 2

        const match = {}
        const sort = {}

        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }

        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        })
        if(!req.user.tasks || req.user.tasks.length == 0){
            return res.status(404).send({"error": "User with the requested id not found !"})
        }
        res.send(req.user.tasks)
    }catch(e){
        res.send(500).send(e)
    }
})

// Get Task by id
router.get('/tasks/:id',auth, async (req,res)=>{
    const {id} = req.params;
    try{
        
        const task = await Task.findOne({
            _id : id ,
            owner : req.user._id
        })
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }

})

//Updating a Task!
router.patch('/tasks/:id', auth, async(req, res)=>{
    const allowedTask = ['description', 'completed']
    const updateTask = Object.keys(req.body)
    const isAllowedTaskUpdate =  updateTask.every((task)=>allowedTask.includes(task))

    if(!isAllowedTaskUpdate){
        return res.status(400).send({"error" : "Invalid Task Update !"})
    }

    try{
        const {id} = req.params

        // const task = await Task.findById(id);
        const task = await Task.findOne({
            _id : id,
            owner : req.user._id
        })


        // const task = await Task.findByIdAndUpdate(id, req.body, {
        //     new : true,
        //     runValidators : true
        // })

        if(!task){
            return res.status(404).send({'error' : "Task Not Found!"})
        }

        updateTask.forEach((key) => {
            task[key] = req.body[key]
        })

        await task.save()

        res.status(200).send(task)
    }catch(e){
        res.status(400).send(e)
    }

})

//DELETING A TASK
router.delete('/tasks/:id', auth, async(req,res)=>{
    try{
        const {id} = req.params;
        // const task = await Task.findByIdAndDelete(id)
        const task = await Task.findOneAndDelete({
            _id : id,
            owner : req.user._id
        })
        if(!task){
            return res.status(404).send({'error' : "Task Not found !"})
        }

        res.status(200).send(task)

    }catch(e){

        res.status(400).send(e)

    }
})

module.exports = router