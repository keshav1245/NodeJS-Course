const express = require('express')
const app = express();

app.get('', (req, res)=>{
    res.send('I am Working')
})

app.get('/help', (req, res)=>{
    res.send('I am in Help !')
})

app.get('/about', (req,res)=>{
    res.send("ABOUT THE APP!")
})

app.get('/weather', (req, res)=>{
    res.send("Get Weather Data !")
})

app.listen(3000,()=>{
    console.log('Server is up and running !')
})