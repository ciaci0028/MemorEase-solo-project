
# MemorEase - Prime Solo Project

*Project Duration: 2 Week Sprint*

Memorease is highly customizable and personalized web application for photos. Unlike the current social media or photo apps, users can upload a photo on any day, but associate that photo with any date. Users can also create and customize tags, which allows for filtering photos and seeing a specific list.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Make a new database called `memorease` in PostgreSQL and use the database.sql file in the root of this project to set up all of your tables.

## Development Setup Instructions

- Run `npm install`
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## How to use Memorease

Upon registering, a user can upload their photos one by one into the application. Users can select the date, as well as any tags they want to be associated with the photo. On the home page, a user will be shown a random photo memory. The filter feature allows the user to view a list of photos based off their tags or a chosen date.

## Built With

This application uses the following technologies:

- [React](https://reactjs.org/)
- [Redux](https://maven.apache.org/)
- [Redux-Sagas](https://redux-saga.js.org/)
- [Express](https://expressjs.com/)
- [Passport](http://www.passportjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Material-UI](https://material-ui.com/)
- [Moment.js](https://momentjs.com/)
- [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2)
- [Passport.js](https://www.passportjs.org/)

(a full list of dependencies can be found in `package.json`)

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## App Demo

To view a demo of the app, check out my [LinkedIn](https://www.linkedin.com/posts/sabrinaciaciura_i-finished-my-first-solo-application-and-ugcPost-6901939941144948736-xdGa?utm_source=linkedin_share&utm_medium=member_desktop_web).
