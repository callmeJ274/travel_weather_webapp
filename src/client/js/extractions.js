
export function extractLocationData(geonamesData) {
    const longitude = geonamesData.geonames[0].lng
    const latitude = geonamesData.geonames[0].lat
    const country = geonamesData.geonames[0].countryName
    const population = geonamesData.geonames[0].population

    return { latitude, longitude, country, population }
}

export function extractWeatherForecastData(weatherbitData, responseData) {

    const weatherforecastData = []
    let timeFrom = responseData.userData.timeFrom
    let timeTo = responseData.userData.timeTo
    const departureDate = responseData.userData.departureDate

    // Checks destination date
    responseData["departFinishedAtDestination"] = false
    responseData["returnFinishedAtDestination"] = false
    if (!(departureDate == weatherbitData.data[timeFrom].valid_date)) {
        console.log(`Date difference between user and destination detected!`)
        // In case the takeoff date matches the next element in forecast dates 
        // -> current detination date is 1 day < user's date
        // => start forecast by date +1 
        if (departureDate == weatherbitData.data[timeFrom + 1].valid_date) {
            console.log(`Destination current date < local date`)
            timeFrom += 1
            timeTo += 1
        // Otherwise current destination date 1 date after user's date
        } else {
            console.log(`Destination current local date > user's date`)
            if (timeFrom > 0) {
                timeFrom -= 1
            } else {
                responseData.departFinishedAtDestination = true
            }
            if (timeTo > 0) {
                timeTo -= 1
            } else {
                responseData.returnFinishedAtDestination = true
            }
        }
    }

    // Calculate to date range to limit forecast as API forcast limits 16 days
    let lastForecastDay = 15
    if (timeTo < 15) {
        lastForecastDay = timeTo
    }
    for (let i = timeFrom; i <= lastForecastDay; i++) {
        const date = weatherbitData.data[i].valid_date
        const windSpeed = weatherbitData.data[i].wind_spd
        const windDirection = weatherbitData.data[i].wind_dir
        const highTemperature = weatherbitData.data[i].high_temp
        const lowTemperature = weatherbitData.data[i].low_temp
        const chancePrecipitation = weatherbitData.data[i].pop
        const humidity = weatherbitData.data[i].rh
        const description = weatherbitData.data[i].weather.description
        const icon = weatherbitData.data[i].weather.icon
        weatherforecastData.push({ date, windSpeed, windDirection, highTemperature, lowTemperature, chancePrecipitation, humidity, description, icon })
    }
    return weatherforecastData
}

export function getMostLikedPhoto(photoData) {
    let topLikes = 0
    let chosenPhoto = ""
    let count = 100
    if (photoData.totalHits < count) {
        count = photoData.totalHits
    }
    // Replace photo if has other photo has more like
    for (let i = 0; i < count; i++) {
        if (photoData.hits[i].likes > topLikes) {
            chosenPhoto = photoData.hits[i].webformatURL
            topLikes = photoData.hits[i].likes
        }
    }
    return chosenPhoto
}

export function getRandomPhoto(photoData) {
    let count = 100
    if (photoData.totalHits < count) {
        count = photoData.totalHits
    }
    // Use numberOfPhotos-1 because this will be an array index
    const randomNumber = Math.round(Math.random() * (count - 1))
    console.log(`Random photo chosen #${randomNumber + 1} of ${count}`)
    const randomPhoto = photoData.hits[randomNumber].webformatURL

    return randomPhoto
}