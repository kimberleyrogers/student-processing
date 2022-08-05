// import the pg library
const pg = require("pg")

// connect to db
let db;
if (process.env.NODE_ENV === "production") {
    db = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    db = new pg.Pool({
        database: "student_withdrawals"
    });
}


// makes this available for use in server.js
module.exports = db


