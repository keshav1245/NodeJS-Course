const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject("Error 404!")
    }, 2000)
})

doWorkPromise
.then((data)=>{
    console.log("Things went well")
    console.log(data)
})
.catch((error)=>{
    console.log("Things not well")
    console.log(error)
})