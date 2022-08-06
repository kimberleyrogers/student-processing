const express = require('express');
const router = express.Router()
const db = require('../database/db.js')
const bcrypt = require('bcrypt')


// hash a password
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// Sends POST request to create new user in the database
router.post('/', (req, res) => {
    console.log(req.body)
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    // let vtUsername = req.body.vtUsername;
    // let vtPassword = req.body.vtPassword;


    const password_hash = generateHash(password)
    // const vt_username_hash = generateHash(vtUsername)
    // const vt_password_hash = generateHash(vtPassword)

    console.log(`checking values received ${name} ${email} ${password_hash}`)

    if (!name || !email || !password) {
        res.status(400).json({success: "false", message: "Your password is too short, or you're missing a field"})
        return
    } else {
        let emailSQL = `
        SELECT * FROM users WHERE email = ($1);
        `
        db.query(emailSQL, [email])
        .then(dbResult => {
            if(dbResult.rows != "") {
                res.status(400).json({success: "false", message: "email already exists"})
                return
            } else {
                let sql = `
                    INSERT INTO users (name, email, password_hash)
                    VALUES ($1, $2, $3);
                `
                db.query(sql, [name, email, password_hash])
                .then(dbResult => {
                    res.json(dbResult)
                })
                .catch(reason => {
                    res.status(500).json("unknown error occurred")
                })
            }
        })
    }
})

module.exports = router