// setTimeout(()=>{
//     console.log("2 Seconds...")
// }, 2000)

// // This Callback is ASYNCHRONOUS

// // A Callback function is a function provided to another function with the intention to be 
// // called later on 

// const names = ['Andrew', 'Keshav', "Jen", "Jess"]
// const shortname = names.filter((name)=>{
//     return name.length <= 4
// })
// //This has Callback but SYNCHRONOUS

// console.log(names)
// console.log(shortname)


// // Callback pattern

// const geocode = (address, callback) =>{
//     setTimeout(()=>{
//         const data = {
//             latitude : 0,
//             longitude : 0
//         }
        
//         callback(data)
//     }, 2000)
// }

// geocode('India',(d)=>{
//     console.log(d)
// })

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

// const add = (a, b, callback)=>{
//     setTimeout(()=>{
//         const s = a + b
//         callback(s)
//     },2000)
// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })

// const geocode = (address, callback) => {
//     setTimeout(()=>{
//         const data ={
//             latitude : 0,
//             longitude : 0
//         }
//         callback(data)
//     }, 2000)
// }

// geocode('India', (d) => {
//     console.log(d)
// })

const doWorkCallback = (callback) =>{
    setTimeout(()=>{
        // callback("This is my error!", undefined)
        callback(undefined, [1,4,7])
    }, 2000)
}

doWorkCallback((error, result)=>{
    if(error){
        return console.log(error)
    }

    console.log(result)
})