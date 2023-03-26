// Calculates the time between now and another date/time to match with the limit weather forecast response
const countdown = require('countdown')
/*
 Check valid date
 */
 function getTimeUntilDate(date) {
    const todayMilliseconds = (new Date()).setHours(1)
    const dateMilliseconds = (new Date(date)).setHours(1)
    const timeUntilDate = countdown(todayMilliseconds, dateMilliseconds, countdown.DAYS).days
    return timeUntilDate
}
export async function submitted(event) {
    // Prevents page reloading when button clicked
    event.preventDefault()
    console.log('Event Listener connected')

    // Set up error message and results
    const errorMessage = document.getElementById('error-message')
    errorMessage.innerHTML = ""
    document.getElementById('forecast-card-container').innerHTML = ""
    document.getElementById('location-image-container').innerHTML = ""

    // Destination city
    const destinationCity = document.getElementById('destination-city').value
    console.log(`City: ${destinationCity}`)
    if (destinationCity == "") {
        errorMessage.innerHTML = "Please enter a destination city"
        return
    }

    // Departure date
    const departureDate = document.getElementById('departure-date').value
    if (departureDate == "") {
        errorMessage.innerHTML = "Please enter a departure date"
        return
    }
    console.log(`Departure date: ${departureDate}`)

    // Return date
    const returnDate = document.getElementById('return-date').value
    if (returnDate == "") {
        errorMessage.innerHTML = "Please enter a return date"
        return
    }
    console.log(`Return date: ${returnDate}`)

    const timeFrom = getTimeUntilDate(departureDate)
    console.log(`Days until departure: ${timeFrom}`)

    const timeTo = getTimeUntilDate(returnDate)
    console.log(`Days until return: ${timeTo}`)

    const tripDuration = timeTo - timeFrom
    console.log(`Trip duration: ${tripDuration}`)
    if (tripDuration < 0) {
        errorMessage.innerHTML = "Return date must be after departure date"
        return
    }

    // Unit for temperature, windspeed, precipitation
    const unitsInput = document.querySelector('input[name="units"]:checked').value
    let units = "M"
    if (unitsInput == "imperial") {
        units = "I"
    }

    let responseData = {}
    responseData["userData"] = { destinationCity, departureDate, returnDate, timeFrom, timeTo, tripDuration, units }
    console.log(responseData)

    // Update UI
    responseData = await Client.apiCalls(responseData)
    if (responseData != null) {
        Client.updateUI(responseData)
        localStorage.setItem('responseData', JSON.stringify(responseData))
    }
}