// libraries in use
const express = require('express');
const axios = require('axios');
const pg = require('pg');
const session = require('express-session');
const pgSession = require ('connect-pg-simple')(session)
const bcrypt = require('bcrypt')
//connects to the db js file for setting session cookies
const db = require('./database/db')
// uses dot environment (file .env) to store password
require('dotenv').config()

// defining each controller and grabbing the file needed
const authController = require('./controllers/auth.js')
const getEnrolmentsController = require('./controllers/getEnrolments.js')
const sessionController = require('./controllers/session.js')
const signUpController = require('./controllers/signUp.js')


// creates the local address
const port = process.env.PORT || 3000;
const app = express();

// tell server where the client side items are
// middleware is anything starting with app.use
app.use(express.static('client/build'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// middleware to set a cookie for the session
app.use(session({
  store: new pgSession({
      pool: db,
      createTableIfMissing: true,
  }),
  secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false
}))

// Logging Middleware - must be before the routes
// sits between the request and the route
app.use((req, res, next) => {
  console.log(`${new Date()} ${req.method} ${req.path}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()
})

// authorisation API functions in separate file 
app.use('/', authController);
app.use('/', getEnrolmentsController);
app.use('/api/session', sessionController);
app.use('/new_user', signUpController);


//error middleware
app.use((err, req, res, next) => {
  console.log('An error occurred!')
  console.log(err)
  res.status(500).json({message: 'some error occurred!'})
  next()
})

/* final catch-all route to index.html defined last */
// app.get('/*', (req, res) => {
//   res.sendFile(__dirname + '/client/build/index.html');
// })

// starts the web server
app.listen(port, () => {
  console.log(`server listening on port: ${port}`)
});
