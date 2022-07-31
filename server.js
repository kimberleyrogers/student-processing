// libraries in use
const express = require('express');
const axios = require('axios');
const pg = require('pg');
const { response } = require('express');
const session = require('express-session');
// no need - do it in the browser
const pgSession = require ('connect-pg-simple')(session)
// XML conversion library


//connects to the db js file for setting session cookies
const db = require('./database/db')

// uses dot environment (file .env) to store password
require('dotenv').config()

// defining each controller and grabbing the file needed
const authController = require('./controllers/auth.js')
const getEnrolmentsController = require('./controllers/getEnrolments.js')

// creates the local address
const port = process.env.PORT || 3000;
const app = express();
// tell server where the client side items are
app.use(express.static('client'))

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

// to set a cookie for the session
app.use(session({
  store: new pgSession({
      pool: db,
      createTableIfMissing: true,
  }),
  secret: process.env.EXPRESS_SESSION_SECRET_KEY,    
}))

// authorisation API functions in seoarate file
app.use('/', authController);
app.use('/', getEnrolmentsController);

// starts the web server
app.listen(port, () => {
  console.log(`server listening on port: ${port}`)
});