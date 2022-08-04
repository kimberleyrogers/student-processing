// import the pg library
const pg = require("pg")

// connect to db
if (process.env.NODE_ENV === "production") {
    db = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    db = new pg.Pool({
        database: "student_withdrawals",
        port: 5432,
    });
}


// makes this available for use in server.js
module.exports = db


