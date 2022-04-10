const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('./task')

//userSchema
const userSchema = new mongoose.Schema({
    name  : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        unique : true,
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
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref : "Task",
    localField : '_id',
    foreignField : 'owner'
})

//mongoose middleware
userSchema.pre('save', async function(next){ //only standard function because aero func dont bind 'this'
    const user = this;
    
    if(user.isModified('password')){

        user.password  = await bcrypt.hash(user.password, 8)

    }
    console.log("Just before Saving !")
    next()
})

//delete user tasks when user is removed : 
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({
        owner : user._id
    })
    next()
})


//making custom function on this schema
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({
        email
    })

    if(!user){
        throw new Error("No User Found for the email entered !") 
    }

    const isMatched = await bcrypt.compare(password, user.password)

    if(!isMatched){
        throw new Error("Incorrect Credentials !")
    }

    return user

}

//making custom function for user schema instance
userSchema.methods.generateAuthToken = async function(){
    const secret = 'aayaMeinGaddiMorhke'
    const user = this;
    const token = jwt.sign({_id : user._id.toString()},secret)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function(){
    const user = this;
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}

//User Model
const User = mongoose.model('User', userSchema)



module.exports = User