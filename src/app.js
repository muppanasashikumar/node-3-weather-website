const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express config
console.log(path.join(__dirname,'../public'))
const publicDirectory = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')
//customized views folder to be renamed as templates folder
const viewsPath = path.join(__dirname,'../templates/views')

const app = express()

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sashi'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help App',
        name: 'Kumar'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About App',
        name: 'Sai'
    })
})

// app.get('', (req,res) => {
//     res.send('Hello Express')
// })

app.get('', (req,res) => {
    res.send('<h1>Hello Express</h1>')
})

// app.get('/help', (req,res) => {
//     res.send('Hello Help Page')
// })

// app.get('/help', (req,res) => {
//     res.send({
//         name: 'Sashi',
//         age: 26
//     })
// })

// app.get('/about', (req,res) => {
//     res.send('Hello About Page')
// })

// app.get('/about', (req,res) => {
//     res.send([{
//         name: 'Sashi',
//         age: 26
//     },
//     {
//         name: 'Sai',
//         age: 22
//     }
// ])
// })

// app.get('/weather', (req,res) => {
//     res.send('Hello Weather Page')
// })

// app.get('/weather', (req,res) => {
//     res.send({
//         forecast: 'It is raining',
//         location: 'India'
//     })
// })

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide address query'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error: 'error'
            })
        }
        forecast(latitude,longitude, (error,forecastData) => {
            if(error) {
                return res.send({
                    error: 'error'
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address,
    //     location: 'India'
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide the search query'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

// app.get('/help/*', (req,res) => {
//     res.send('Help artcile not found')
// })

app.get('/help/*', (req,res) => {
    res.render({
        title: '404 Help Error',
        name: 'Sashi',
        errorMEssage: 'Help 404 NOt found'
    })
})

// app.get('*', (req,res) => {
//     res.send('My 404 Page')
// })

app.get('*', (req,res) => {
    res.render('404',{
        title: '404 Error',
        name: 'Muppana',
        errorMessage: 'Page Not found'
    })
})



app.listen(3000, () => {
    console.log('Server is up and running')
})