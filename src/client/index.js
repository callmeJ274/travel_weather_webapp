import { submitted } from './js/app'
import { updateUI } from './js/updateUI'
import { checkLocalStorage } from './js/localStorage'
import { cleanLocalStorage } from './js/localStorage'
import { apiCalls } from './js/apiCalls'
import { extractLocationData } from './js/extractions'
import { extractWeatherForecastData } from './js/extractions'
import { getMostLikedPhoto } from './js/extractions'
import { getRandomPhoto } from './js/extractions'
import { createForecastCard } from './js/createForecastCard'
import './styles/main.scss'
import './icons/a01d.png'
import './icons/a02d.png'
import './icons/a03d.png'
import './icons/a04d.png'
import './icons/a05d.png'
import './icons/a06d.png'
import './icons/c01d.png'
import './icons/c02d.png'
import './icons/c03d.png'
import './icons/c04d.png'
import './icons/d01d.png'
import './icons/d02d.png'
import './icons/d03d.png'
import './icons/f01d.png'
import './icons/r01d.png'
import './icons/r02d.png'
import './icons/r03d.png'
import './icons/r04d.png'
import './icons/r05d.png'
import './icons/r06d.png'
import './icons/s01d.png'
import './icons/s02d.png'
import './icons/s03d.png'
import './icons/s04d.png'
import './icons/s05d.png'
import './icons/s06d.png'
import './icons/t01d.png'
import './icons/t02d.png'
import './icons/t03d.png'
import './icons/t04d.png'
import './icons/t05d.png'
import './icons/u00d.png'

export {
    submitted,
    updateUI,
    checkLocalStorage,
    cleanLocalStorage,
    apiCalls,
    extractLocationData,
    extractWeatherForecastData,
    getMostLikedPhoto,
    getRandomPhoto,
    createForecastCard
}

// Automatically set limits on date-picker selections in input form
(function () {
    // Get today's date
    const d = new Date()
    let minMonth = (d.getMonth() + 1).toString()
    let minDate = d.getDate().toString()
    const minYear = d.getFullYear().toString()
    if (minMonth.length == 1) {
        minMonth = "0" + minMonth
    }
    if (minDate.length == 1) {
        minDate = "0" + minDate
    }
    // Limit forecast date 15 + today
    d.setDate(d.getDate() + 15)
    let maxMonth = (d.getMonth() + 1).toString()
    let maxDate = d.getDate().toString()
    const maxYear = d.getFullYear().toString()
    if (maxMonth.length == 1) {
        maxMonth = "0" + maxMonth
    }
    if (maxDate.length == 1) {
        maxDate = "0" + maxDate
    }

    // Automatocally limit choosing range in input form
    const formattedMinDate = `${minYear}-${minMonth}-${minDate}`
    const formattedMaxDate = `${maxYear}-${maxMonth}-${maxDate}`
    const departureDate = document.getElementById('departure-date')
    departureDate.setAttribute("min", formattedMinDate)
    departureDate.setAttribute("max", formattedMaxDate)
    const returnDate = document.getElementById('return-date')
    returnDate.setAttribute("min", formattedMinDate)

    // Click listener for submit-button
    const submitButton = document.getElementById('submit-button')
    submitButton.addEventListener('click', submitted)

    // Add listener to update the UI
    window.addEventListener('load', checkLocalStorage)

    // Click listener to Clear Data button to delete local storage
    const cleanButton = document.getElementById('clean-button')
    cleanButton.addEventListener('click', cleanLocalStorage)

})()