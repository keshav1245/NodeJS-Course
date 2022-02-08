const mongoose = require('mongoose');
// const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true
})

//User Model
// const User = mongoose.model('User', {
//     name  : {
//         type : String,
//         trim : true,
//         required : true
//     },
//     email : {
//         type : String,
//         trim : true,
//         lowercase : true,
//         required : true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Email is invalid!")
//             }
//         }
//     },
//     password : {
//         type : String,
//         minlength : 6,
//         required : true,
//         trim : true,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Invalid Password !')
//             }
//         }
//     },
//     age : {
//         type : Number,
//         default : 0,
//         validate(value){
//             if(value < 0){
//                 throw new Error('Age must be a positive number!')
//             }
//         }
//     }
// })

// const me = new User({
//     name : " Zukayu ",
//     email : "   TANGRI57@GMAIL.COM   ",
//     password : 'hello'
// })

// me.save()
// .then(() => {
//     console.log(me)
// })
// .catch((error)=>{
//     console.log(error)
// })

//Task Model
// const Task = mongoose.model('Task', {
//     description : {
//         type : String,
//         trim : true,
//         required : true
//     },
//     completed : {
//         type : Boolean,
//         default : false
//     }
// })


// const task1 = new Task({
//     description : "   Sample task from mongoose     "
// })

// task1.save()
// .then(()=>{
//     console.log(task1)
// })
// .catch((error)=>{
//     console.log(error)
// })

