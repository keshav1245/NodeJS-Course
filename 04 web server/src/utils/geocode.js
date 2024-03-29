const request = require('postman-request')
const geocode = (address,  callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoienVrYXl1IiwiYSI6ImNrdTVjdHN6MTA2ZHEyc3BhNndtODYweHgifQ.pfnJwSsh5uUVtx29bmOtBg&limit=1"
    request({url, json : true}, (error, {body})=>{
        if(error){
            callback("Unable to call location services", undefined)
        }else if(body.features.length == 0){
            callback("NO Location found for the entered query", undefined)
        }else{

            callback(undefined,
                {
                    latitude : body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    location : body.features[0].place_name
                }
                )

        }
    })
}

module.exports = geocode