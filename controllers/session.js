const express = require('express');
const router = express.Router()
const db = require('../database/db.js')
const bcrypt = require('bcrypt')

// hash a password
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

router.get('/api/session', (req, res) => {
    let name = req.session.name
    let email = req.session.email
    res.json({
        name, email
    })  
})

// handles login, setting session
router.post('/api/session', (req, res) => {
    //get email and pw from body of the request
    const { email, password } = request.body
    const sql = `
    SELECT * FROM users WHERE email = $1;
    `
    //check the email and password in the DB
        //if the email/pw are correct, set the session
    db.query(sql, [email])
        .then(dbResult => {
            if (dbResult.rows != "") {
                let check = bcrypt.compareSync(password, dbResult.rows[0].password_hash)
                    if (check === true) {
                        req.session.name = dbResult.rows[0].username
                        req.session.email = dbResult.rows[0].email
                        res.json({ message: 'logged in successfully' })
                } else {
                    res.status(401).json("password is wrong")
                }
            } else {
                res.status(401).json("the email doesn't exist, sign up instead")
            }
        })
        .catch(reason => {
            res.status(500).json("unknown error occurred")
        })
})

router.delete('/api/session', (req, res) => {
    req.session.destroy()
    console.log('deleting session server side')
    res.json({ message: 'session has been deleted' })
})

module.exports = router