const mongoose = require('mongoose');
const validator = require('validator');


//User Model
const User = mongoose.model('User', {
    name  : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        lowercase : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!")
            }
        }
    },
    password : {
        type : String,
        minlength : 6,
        required : true,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Invalid Password !')
            }
        }
    },
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number!')
            }
        }
    }
})

module.exports = User