# Travel Weather Web App
The project is a Capstone Project from Udacity's Front End Web Design Nanodegree

## Description
This project stimulates a Weather forecast app which predicts the weather in the travel destination choosing by user. The data is powered by:

* [Geonames API](http://www.geonames.org/) - gets location information: longitude, latitude when user input city name
* [Weatherbit API](https://www.weatherbit.io/) - gets weather forecast based on the location data
* [Pixabay API](https://pixabay.com/)  - gets photo for the location

## Folder description:
- __test__/ : unit test
- src/ : contains file to set up interface and call API, main codes are in client/ and server/
- .babelrc: interface style loader
- package.json: module dependencies in set up environment
- webpack.dev/prod.js: running in development/ production environment

## Prerequisite
This project runs on a local server and used Node. If you don't have *Node* already installed on your local machine, you can download it [**here**](https://nodejs.org/en/download/).

You must have an API key for weatherbit and pixabay, for geonames, you should fill our username, your account need to be assign for web server. See more in the Geonames documentation
File should contain:
```
GEONAMES_USERNAME = {your user name here}
WEATHERBIT_KEY = {your key here}
PIXABAY_KEY = {your key here}
```
## Installation and Using the App

```
npm install
npm run dev
npm run build
npm run start
```
To load the page, set your browser's address bar to:
```
http://localhost:8081/
```
The app takes 4 user parameters:

* **Destination city (required)** - The city/location where you'll travel to. For example: London

* **Departure date (required)** - You can choose any date from today until 15 days after.
* **Return date (required)** - The date you planning to return. The limit forecast is maximum 15 days. Please make sure you choose the date after your departure date to get the forecast. Otherwise, it will return error.
* **Units (required, default *metric*)** 
    * metric: ℃, m/s, mm
    * imperial: ℉, mph, in

Press the **Submit** button when you completely enter the valid data
Waite for moment for the data to be loaded and displayed. The photo displayed the scence of the destination. You can press Change Photo button to get another photo. You can press Clean Page button to clear the page

