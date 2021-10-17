// Asynchronous basics
// console.log('Starting')

// setTimeout(()=>{
//     console.log('Some backend call!')
// }, 3000)

// setTimeout(()=>{
//     console.log('Some backend call part 2!')
// }, 0)

// console.log('Stopping')

// const request = require('postman-request')
// const url = 'http://api.weatherstack.com/current?access_key=04f500acbf710a73478c6037f4ad8eaa&query=30.7350626,76.6934883'


// request({url : url, json : true}, (error, response)=>{
//     // console.log(response.body.current)
//     if(error){
//         console.log("Unable to connect to weather service!")
//     }else if(response.body.error){
//         console.log(response.body.error.info)
//     }
//     else{
//         const data = response.body.current;
//         console.log(`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)    
//     } 
// })

// const geocodingURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoienVrYXl1IiwiYSI6ImNrdTVjdHN6MTA2ZHEyc3BhNndtODYweHgifQ.pfnJwSsh5uUVtx29bmOtBg&limit=1"

// request({url : geocodingURL , json : true},(error, response)=>{

//     if(error){
//         console.log("Unable to connect to MapBox services...")
//     }else if(response.body.message){
//         console.log(response.body.message)
//     }else if(response.body.features.length == 0){
//         console.log("NO Location found for the entered query")
//     }else{
//         // console.log(response.body)
//         const coordinates = response.body.features[0].center;
//         console.log("Longitude : "+coordinates[0])
//         console.log("Latitude : "+coordinates[1])
//     }
// })

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const place = process.argv[2]

if(!place){
    return console.log("Location is missing!")
}

geocode(place, (error , {latitude, longitude, location} = {} )=>{
    if (error){
        return console.log(error)
    }

    forecast(latitude, longitude, (error, foreCastData)=>{
        if(error){
            return console.log(error)
        }

        console.log(location)
        console.log(foreCastData)
    })
    
})


