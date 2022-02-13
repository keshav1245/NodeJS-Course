require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("6201e46e1bd04c37db8c819c")
// .then((d)=>{
//     console.log(d)
//     return Task.countDocuments({
//         completed : false
//     })
// })
// .then((result)=>{
//     console.log(result)
// })
// .catch((err)=>{
//     console.log(err)
// })

const deleteTaskAndCount = async (id) =>{
    const task = await Task.findByIdAndDelete(id);
    const count =  await Task.count({completed : false})
    return {task, count}
}

deleteTaskAndCount("6203b8b1470468c8437faee1")
.then((data)=>{
    console.log(data.task)
    console.log(data.count)
})
.catch((err)=>{
    console.log(err)
})