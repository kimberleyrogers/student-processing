// import the pg library
const pg = require("pg")

// connect to db
const db = new pg.Pool({
    database: 'student_withdrawals'
})

// makes this available for use in server.js
module.exports = db
