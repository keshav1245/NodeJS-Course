const add = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        }, 2000)
    })
}

// add(1,2)
// .then((s)=>{
//     console.log(s)
//     add(s, 5)
//     .then((s2)=>{console.log(s2)})
//     .catch((err)=>{console.log(err)})
// })
// .catch((err)=>{
//     console.log(err)
// })


//Promise Chaining

add(1,1)
.then((sum)=>{
    console.log(sum)
    return add(sum, 4)
})
.then((sum)=>{
    console.log(sum)
})
.catch((err)=>{
    console.log(err)
})