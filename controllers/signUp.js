const express = require('express');
const router = express.Router()
const db = require('../database/db.js')
const bcrypt = require('bcrypt')


// hash a password
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// Sends POST request to create new user in the database
router.post('/new_user', (req, res) => {
    console.log(req.body)
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let vtUsername = req.body.vtUsername;
    let vtPassword = req.body.vtPassword;

    console.log(`checking values recieved ${name} ${email} ${password} ${vtUsername} ${vtPassword}`)

    const password_hash = generateHash(password)
    const vt_username_hash = generateHash(vtUsername)
    const vt_password_hash = generateHash(vtPassword)

    console.log(`checking values received ${name} ${email} ${password_hash} ${vt_username_hash} ${vt_password_hash}`)

    if (!name || !email || !password || !vtUsername || !vtPassword) {
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
                console.log('line 38')
                return
            } else {
                console.log('line 41')
                let sql = `
                    INSERT INTO users (name, email, password_hash, vt_username_hash, vt_password_hash)
                    VALUES ($1, $2, $3, $4, $5);
                `
                db.query(sql, [name, email, password_hash, vt_username_hash, vt_password_hash])
                .then(dbResult => {
                    console.log('line 48')
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