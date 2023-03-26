/**
 * Calls the 3 APIs to response to client interface
 * @param {object} responseData 
 */
const fetch = require('node-fetch')
export async function apiCalls(responseData) {

    // Set up error message for failed connection
    const errorMessage = document.getElementById('error-message')
    const serverError = "Couldn't connect to server."

    // Geonames API
    // Response types: successfull data, error: failed connection, unmatched input
    const geonamesData = await callServer('callgeo', responseData)
    if (geonamesData == null) {
        errorMessage.innerHTML = serverError
        return null
    } 
    else if (geonamesData.geonames.length == 0) {
        errorMessage.innerHTML = `Unmatched ${responseData.userData.destinationCity} in server data. Please check the input again.`
        return null
    }
    responseData["locationData"] = Client.extractLocationData(geonamesData)
    console.log(responseData.locationData)

    // Weatherbit API
    // Response types: successfull data, error: failed connection
    const weatherbitData = await callServer('callweather', responseData)
    if (weatherbitData == null) {
        errorMessage.innerHTML = serverError
        return null
    }
    responseData["weatherforecastData"] = Client.extractWeatherForecastData(weatherbitData, responseData)
    console.log(responseData.weatherforecastData)

    // Pixabay API
    // Response types: photo URL
    const photoData = await callServer('callphoto', responseData)
    if (photoData == null) {
        errorMessage.innerHTML = serverError
        return null
    }
    responseData["photo"] = Client.getMostLikedPhoto(photoData)
    responseData["photoData"] = photoData
    console.log(responseData.photo)

    // store data in server variable
    const storeMessage = await callServer('storedata', responseData)
    console.log(storeMessage)

    return responseData
}

/**
 * Calls the server side routes
 * @param {string} url Contains the route to server
 * @param {object} responseData data acquired so far from user and APIs
 */
export async function callServer(url, responseData) {
    try {
        const response = await fetch(`http://localhost:5689/${url}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(responseData)
        })
        // Failed connection
        if (!response.ok) {
            console.log(`Error connecting to http://localhost:5689/${url}. Response status ${response.status}`)
            return null
        }
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.log(`Error connection: ${error}`)
        return null
    }
}