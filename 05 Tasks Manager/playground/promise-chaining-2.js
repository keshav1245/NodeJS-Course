require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete("6201e46e1bd04c37db8c819c")
.then((d)=>{
    console.log(d)
    return Task.countDocuments({
        completed : false
    })
})
.then((result)=>{
    console.log(result)
})
.catch((err)=>{
    console.log(err)
})