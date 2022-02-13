const add = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(a < 0 || b < 0){
                return reject('Numbers Must be non negative !')
            }
            resolve(a+b)
        }, 2000)
    })
}

const doWork = async ()=>{
    const data1 = await add(1,99)
    const data2 = await add(data1, 50)
    const data3 = await add(data2, -3)
    return data3
}

doWork()
.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})