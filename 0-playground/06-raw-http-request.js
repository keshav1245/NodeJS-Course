const http = require('http');
const url = 'http://api.weatherstack.com/current?access_key=04f500acbf710a73478c6037f4ad8eaa&query=30,76';

const request  = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk)=>{
        data += chunk.toString()
        // console.log(data)
    })

    response.on('end', ()=>{
        console.log('REQUEST ENDED !')
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error)=>{
    console.log(error)
})

request.end()