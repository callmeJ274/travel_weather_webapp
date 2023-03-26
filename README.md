# Travel Weather Web App
The project is a Capstone Project from Udacity's Front End Web Design Nanodegree

## Description
This project stimulates a Weather forecast app which predicts the weather in the travel destination choosing by user. 
- When open the web app, user should enter the destination city, the departure date, return date, the unit to return weather parameter unit will be set to Metric(℃, m/s, mm) as default, otherwise user can choose Imperial( ℉, mph, in) unit. 
- When clicking the submit button, the web will show the image of the city in the left hand side and the forecast weather display below.

## Folder description:
- __test__/ : unit test
- src/ : contains file to set up interface and call API, main codes are in client/ and server/
- .babelrc: interface style loader
- package.json: module dependencies in set up environment
- webpack.dev/prod.js: running in development/ production environment

## Prerequisite for developer
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
http://localhost:5689/
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
## Unit Test
- The unit test will test 2 cases: for API response (Geonames) and Storing data. When running test, make sure you keep the web app in running (npm run start) and open a new terminal, the test will be successful. The reason to keep the web app running is that here the project calling API response online.

```
npm run start # in case the web app is stopped
npm run test
```
