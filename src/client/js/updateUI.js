// Update UI
export function updateUI(responseData) {

    // Destination image
    const locationImage = document.createElement('img')
    locationImage.src = responseData.photo
    locationImage.height = 420
    locationImage.width = 500
    const imageContainer = document.getElementById('location-image-container')
    // Clears image
    imageContainer.innerHTML = ""
    let fragment = document.createDocumentFragment()
    fragment.append(locationImage)


    // Button to change image
    const changeImageButton = document.createElement('button')
    changeImageButton.innerHTML = "Change Image"
    changeImageButton.classList.add('change-image-button')


    changeImageButton.addEventListener('click', () => {
        // Get a random photo
        // clear storage
        // Set storage again
        responseData.photo = Client.getRandomPhoto(responseData.photoData)
        locationImage.src = responseData.photo
        localStorage.clear()
        localStorage.setItem('responseData', JSON.stringify(responseData))
    })
    fragment.append(changeImageButton)
    imageContainer.append(fragment)

    
    fragment = document.createDocumentFragment()
    // Set message for collapsed between user's time and destination -> no forecast
    if (responseData.departFinishedAtDestination) {
        const forecastCard = document.createElement('div')
        forecastCard.classList.add('forecast-card')
        forecastCard.innerHTML = "<h2>No forecast as your local time is already finished at the destination</h2>"
        fragment.append(forecastCard)
    }
    if (responseData.returnFinishedAtDestination) {
        const forecastCardContainer = document.getElementById('forecast-card-container')
        forecastCardContainer.innerHTML = ""
        forecastCardContainer.append(fragment)
        return
    }
    const forecasts = responseData.weatherforecastData

    // Create a forecast card for each day
    for (const forecast of forecasts) {
        const forecastCard = Client.createForecastCard(forecast, responseData.userData.units)
        fragment.append(forecastCard)
    }

    // Clear old data
    const forecastCardContainer = document.getElementById('forecast-card-container')
    forecastCardContainer.innerHTML = ""
    forecastCardContainer.append(fragment)
}