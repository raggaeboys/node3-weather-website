const path = require('path')
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express()

//Defines path for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //This first. It sets the path.
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(reg, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Hugh Clarke',
        footer: 'Created by Hugh Clarke'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hugh Clarke',
        footer: 'Created by Hugh Clarke'
    })
})



app.get('/help', (req, res) =>{
    res.render('help',{
        name: 'Support',
        phone: '954-234-6629',
        title: 'Help',
        footer: 'Created by Hugh Clarke'
    })
     
})


app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    };

geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error) {            
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
                res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })           
            
        })
    })
})



app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send ({        
        products: []
        
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Hugh Clarke',
        errorMessage: 'article not found',
        footer: 'Created by Hugh Clarke'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Hugh Clarke',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})