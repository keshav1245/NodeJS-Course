// CRUD operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id)
// console.log(id.id.length)
// console.log(id.toHexString())
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, {
    useNewUrlParser : true
}, (error, client)=>{
    if(error){
        return console.log("Unable to connect to database !")
    }

    const db = client.db(databaseName)

    //CREATE - C

    // db.collection('users').insertOne({
    //     _id : id,
    //     name : "zukayu",
    //     age : 18
    // }, (error, results)=>{
    //     if(error){
    //         return console.log("unable to insert user")
    //     }

    //     console.log(results.ops)//array of all the doc
    // })

    // db.collection('users').insertMany([{
    //     name : "Example 1",
    //     age : 15
    // }, {
    //     name : "Example 2",
    //     age : 20
    // }], (error, results)=>{
    //     if(error){
    //         return console.log("Inable to insert docs")
    //     }

    //     console.log(results.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description : "Task 1",
    //         completed : true
    //     },
    //     {
    //         description : "Task 2",
    //         completed : false
    //     },
    //     {
    //         description : "Task 3",
    //         completed : true
    //     }
    // ])

    //READ - R

    // db.collection('users').findOne({
    //     // age : 23,
    //     // name : "zukayu",
    //     _id : ObjectId("61ffeb6b14c45e35f072e51a")
    // }, (error, user)=>{
    //     if(error){
    //         return console.log("Error")
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ // we get cursor back instead of callback
    //     age : 23
    // }).toArray(
    //     (error, users)=>{
    //         if(error){
    //             return console.log("Error !")
    //         }else{
    //             console.log(users)
    //         }
    //     }
    // )

    // db.collection('users').find({ // we get cursor back instead of callback
    //     age : 23
    // }).count(
    //     (error, count)=>{
    //         if(error){
    //             return console.log("Error !")
    //         }else{
    //             console.log(count)
    //         }
    //     }
    // )


    // db.collection('tasks').findOne({
    //     _id : ObjectId()
    // }, (error, task)=>{
    //     if(error){
    //         return console.log("Error!")
    //     }
        
    //     console.log(task)
    // })

    // db.collection('tasks').find({
    //     completed : false
    // }).toArray((error, tasks)=>{
    //     if(error){
    //         return console.log("Error!")
    //     }
        
    //     console.log(tasks)
    // })

    //UPDATE - U

    // const updatePromise = db.collection('users').updateOne({
    //     _id: ObjectId("61ffdd08d9debff01aad7fa6")
    // },{
    //     $set : {name : "Mike"} // $set is a MongoDB Update operator, many available check google
    // })

    // updatePromise
    // .then((data)=>{
    //     console.log("Successfully Updated")
    //     console.log(data)
    // })
    // .catch((error)=>{
    //     console.log("Update Failed !")
    //     console.log(error)
    // })

    // db.collection('users').updateOne({
    //     _id: ObjectId("61ffdd08d9debff01aad7fa6")
    // },{
    //     $inc : {
    //         age : 2
    //     }
    // })
    // .then((data)=>{
    //     console.log("Age updated !")
    //     console.log(data)
    // })
    // .catch((error)=>{
    //     console.log("Age not updated !")
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed : true
    // }, {
    //     $set : {completed : false}
    // })
    // .then((data)=>{
    //     console.log("Tasks updated !")
    //     console.log(data)
    // })
    // .catch((error)=>{
    //     console.log("Tasks not updated !")
    //     console.log(error)
    // })

    // DELETE - D

    // db.collection('users').deleteMany({
    //     age : 23
    // })
    // .then((data)=>{
    //     console.log("Users Deleted !")
    //     console.log(data)
    // })
    // .catch((error)=>{
    //     console.log("Users not deleted !")
    //     console.log(error)
    // })

    // db.collection('tasks').deleteOne({
    //     description : "Task 2"
    // })
    // .then((data)=>{
    //     console.log("task Deleted !")
    //     console.log(data)
    // })
    // .catch((error)=>{
    //     console.log("task not deleted !")
    //     console.log(error)
    // })

    

})