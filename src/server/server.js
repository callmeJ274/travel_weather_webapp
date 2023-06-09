const dotenv = require('dotenv')
dotenv.config()

// Set URL pieces for 3 APIs
const GEONAMES_ROOT = "http://api.geonames.org/searchJSON?q="
const GEONAMES_KEY_URL = `&username=${process.env.GEONAMES_USERNAME}`
const GEONAMES_PARAMS = "&maxRows=1"

const WEATHERBIT_ROOT = "https://api.weatherbit.io/v2.0/forecast/daily?"
const WEATHERBIT_KEY_URL = `&key=${process.env.WEATHERBIT_KEY}`
const WEATHERBIT_PARAMS = "&units="

const PIXABAY_ROOT = "https://pixabay.com/api/?q="
const PIXABAY_KEY_URL = `&key=${process.env.PIXABAY_KEY}`
const PIXABAY_PARAMS = "&image_type=photo&orientation=horizontal&safesearch=true&per_page=100"


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express()

app.use(cors())
app.use(express.static('dist'))

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json())

// This is for testing server endpoints
module.exports = app
// Set up object storing all data from user side
const responseData = []

app.get('/',
    (req, res) => res.sendFile('dist/index.html')
)

// Endpoint for the Geonames API
app.post('/callgeo', callGeo)

async function callGeo(req, res) {
    console.log(`Geonames request city is ${req.body.userData.destinationCity}`)
    const city = req.body.userData.destinationCity
    const geonamesURL = GEONAMES_ROOT + city + GEONAMES_PARAMS + GEONAMES_KEY_URL
    console.log(`Geonames URL is ${geonamesURL}`)
    try {
        const response = await fetch(geonamesURL)
        // Checks for failed data transfer from API, returns null
        if (!response.ok) {
            console.log(`Error connecting to Geonames API. Response status ${response.status}`)
            res.send(null)
        }
        const responseJSON = await response.json()
        res.send(responseJSON)
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        res.send(null)
    }
}

// Endpoint for the Weatherbit API
app.post('/callweather', callWeather)

async function callWeather(req, res) {
    console.log(`Request latitude is ${req.body.locationData.latitude}`)
    console.log(`Request longitude is ${req.body.locationData.longitude}`)
    const latitude = req.body.locationData.latitude
    const longitude = req.body.locationData.longitude
    const locationURL = `lat=${latitude}&lon=${longitude}`
    const units = req.body.userData.units
    const weatherbitURL = WEATHERBIT_ROOT + locationURL + WEATHERBIT_KEY_URL + WEATHERBIT_PARAMS + units
    console.log(`Weatherbit URL is ${weatherbitURL}`)
    try {
        const response = await fetch(weatherbitURL)
        // Checks for failed data transfer from API, returns null
        if (!response.ok) {
            console.log(`Error connecting to Weatherbit API. Response status ${response.status}`)
            res.send(null)
        }
        const responseJSON = await response.json()
        res.send(responseJSON)
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        res.send(null)
    }
}

// Endpoint for the Pixabay API
app.post('/callphoto', callPhoto)

async function callPhoto(req, res) {
    console.log(`Pixabay request city is ${req.body.userData.destinationCity}`)
    const city = req.body.userData.destinationCity
    let pixabayURL = PIXABAY_ROOT + city + PIXABAY_KEY_URL + PIXABAY_PARAMS
    console.log(`Pixabay URL is ${pixabayURL}`)
    try {
        let response = await fetch(pixabayURL)
        // Checks for failed data transfer from API, returns null
        if (!response.ok) {
            console.log(`Error connecting to Pixabay API. Response status ${response.status}`)
            res.send(null)
        }
        let responseJSON = await response.json()

        // If no photo was returned for city, get one for the country instead
        if (responseJSON.total == 0) {
            const country = req.body.locationData.country
            console.log(`No photo available for ${city}. Finding photo for ${country}.`)
            pixabayURL = PIXABAY_ROOT + country + PIXABAY_KEY_URL + PIXABAY_PARAMS
            console.log(`Pixabay country search URL is ${pixabayURL}`)
            response = await fetch(pixabayURL)
            // Checks for failed data transfer from API, returns null
            if (!response.ok) {
                console.log(`Error connecting to Pixabay. Response status ${response.status}`)
                res.send(null)
            }
            responseJSON = await response.json()
        }

        res.send(responseJSON)
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        res.send(null)
    }
}

// Endpoint for the data storage route
app.post('/storedata', storeData)

function storeData(req, res) {
    responseData.push(req.body)
    console.log(responseData)
    res.send({ message: "Data received and stored" })
}



