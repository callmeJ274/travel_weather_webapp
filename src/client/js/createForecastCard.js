export function createForecastCard(forecast, units) {
    // Update Unit
    let temperatureUnit = "C"
    let speedUnit = "m/s"
    let depthUnit = "mm"
    if (units == "I") {
        temperatureUnit = "F"
        speedUnit = "mph"
        depthUnit = "in"
    }
    // Create card div
    const forecastCard = document.createElement('div')
    forecastCard.classList.add('forecast-card')

    // Create the date div, calculate day of week
    const dateDiv = document.createElement('div')
    dateDiv.classList.add('date')
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayOfWeekNumber = new Date(forecast.date).getDay()
    const dayOfWeek = days[dayOfWeekNumber]
    dateDiv.innerHTML = `<h2 class="card-date">${forecast.date}<br>${dayOfWeek}</h2>`

    // Create icon div, link to icon image
    const icon = document.createElement('img')
    icon.classList.add('icon')
    icon.src = `./icons/${forecast.icon}.png`
    icon.alt = ""

    // Weather description div
    const descriptionDiv = document.createElement('div')
    descriptionDiv.classList.add('description')
    descriptionDiv.innerHTML = forecast.description

    // High temperature div
    const highTemperatureDiv = document.createElement('div')
    highTemperatureDiv.classList.add('high-temperature')
    highTemperatureDiv.innerHTML = `High temperature: ${forecast.highTemperature}°${temperatureUnit}`

    // Low temperature div
    const lowTemperatureDiv = document.createElement('div')
    lowTemperatureDiv.classList.add('low-temperature')
    lowTemperatureDiv.innerHTML = `Low temperature: ${forecast.lowTemperature}°${temperatureUnit}`

    // Humidity div
    const humidityDiv = document.createElement('div')
    humidityDiv.classList.add('humidity')
    humidityDiv.innerHTML = `Humidity: ${forecast.humidity}%`

    // Precipitation chance div
    const chancePrecipitationDiv = document.createElement('div')
    chancePrecipitationDiv.classList.add('chance-precipitation')
    chancePrecipitationDiv.innerHTML = `Precipitation Chance: ${forecast.chancePrecipitation}%`

    // Wind speed div
    const windSpeedDiv = document.createElement('div')
    windSpeedDiv.classList.add('wind-speed')
    windSpeedDiv.innerHTML = `Windspeed: ${forecast.windSpeed.toFixed(1)}${speedUnit}`

    // Wind direction div
    const windDirectionDiv = document.createElement('div')
    windDirectionDiv.classList.add('wind-direction')
    windDirectionDiv.innerHTML = `Wind direction: ${forecast.windDirection}°`

    forecastCard.append(dateDiv)
    forecastCard.append(icon)
    forecastCard.append(descriptionDiv)
    forecastCard.append(highTemperatureDiv)
    forecastCard.append(lowTemperatureDiv)
    forecastCard.append(humidityDiv)
    forecastCard.append(chancePrecipitationDiv)
    forecastCard.append(windSpeedDiv)
    forecastCard.append(windDirectionDiv)

    return forecastCard
}