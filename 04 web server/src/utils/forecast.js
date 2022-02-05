const request = require('postman-request')

const forecast =  (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=04f500acbf710a73478c6037f4ad8eaa&query='+latitude+','+longitude;
    request({url , json: true}, (error, {body})=>{
        if(error){
            callback("Unable to connect to weather service!", undefined);
        }else if(body.error){
            callback(body.error.info , undefined)
        }else{
            const data = body.current;
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)    
        }
    })

}

module.exports = forecast;