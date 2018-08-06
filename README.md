# P8 Neighbourhood Map - Front-end Udacity Scholarship

*Fika is the swedish verb for enjoying coffee and something to eat with friends or family*

I was tasked to create  a single-page application using React featuring a map of my neighborhood (Stockholm). I added additional functionality to this application, including: map markers to identify my favourite 'fika' spots, a search function to easily discover these locations, and a list view to support simple browsing of all of my locations. I made use of the FourSquare API to provide additional information (the address) about each of these locations.

## Prerequisite

**npm** is a prerequisite for this application, download [here](https://www.npmjs.com/get-npm)


## Running the application
  
  1. Clone this repository and install all project dependencies with `npm install` inside the project folder
  2. Launch the project by starting the development server with `npm start`, this should open the App in your browser (http://localhost:3000)

## The ServiceWorker

To be able to test the ServiceWorker:
1. `yarn build`  to builds the app for production to the `build` folder
2. `serve -s build` to run the build 



## Third Party Libraries

* Google Maps API for the map
* FourSquare API for the additional information (address)

**NOTE** Client ID & Secrets have been removed - to add your own client id and secret, please visit [FourSquare Api](https://developer.foursquare.com/) and [Google Maps API](https://console.developers.google.com/apis/)


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).












