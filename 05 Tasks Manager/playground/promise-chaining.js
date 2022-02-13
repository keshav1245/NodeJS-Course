require('../src/db/mongoose')
const User = require('../src/models/user')


//6201e04ee20f373760c6603f

// User.findByIdAndUpdate("6201c291c8315dd5deee258f", 
// {
//     age : 1
// })
// .then((user)=>{
//     console.log(user)
//     return User.countDocuments({age : 1})
// })
// .then((result)=>{
//     console.log(result)
// })
// .catch((err)=>{console.log(err)})

//Converting to Async Await!
const updateAgeAndCountDocs = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return {user, count}
}

updateAgeAndCountDocs("6201c291c8315dd5deee258f", 1)
.then((data)=>{
    console.log(data.user)
    console.log(data.count)
})
.then((err)=>{
    console.log(err)
})
