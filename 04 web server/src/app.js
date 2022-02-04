//requiring packages
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars view engine and view dir location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title : "Weather App",
        name : "Keshav Tangri"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : "About Page",
        name : "Keshav Tangri"
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title : "Help Page",
        name : "Keshav Tangri",
        message : "This is a help page"
    })
})

app.get('/weather', (req, res)=>{
    res.send({"location" : "Chandigarh India", "forecast" : "12 deg C" })
})

app.get('/help/*',(req,res)=>{
    res.render('error404', {
        title : "ERROR 404 : Not Found !",
        name : "Keshav Tangri",
        message : "Help article Not Found"
    })
})

app.get('*', (req, res)=>{
    res.render('error404', {
        title : "ERROR 404 : Not Found !",
        name : "Keshav Tangri",
        message : "Page Not Found"
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running !')
})