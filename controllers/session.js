const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
const bcrypt = require("bcrypt");
const session = require('express-session');

// hash a password
function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

// grabs current session cookies and returns name and email
router.get('/', (req, res) => {
  let name = req.session.name;
  let email = req.session.email;
  console.log(`checking session cookies - name is ${name} and email is ${email}`)
  res.json({
    'name': name,
    'email': email
  });
});

// handles login, setting sessions for user based on name and email
router.post('/', (req, res) => {
  //get email and pw from body of the request
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM users WHERE email = ($1);
    `;

  console.log(`server side ${email} ${password}`);

  db.query(sql, [email])
    .then((dbResult) => {
      if (dbResult.rows != "") {
        let check = bcrypt.compareSync(
          password,
          dbResult.rows[0].password_hash
        );
        if (check === true) {
          req.session.id = dbResult.rows[0].id;
          console.log('session id is set: ' + req.session.id)
          req.session.name = dbResult.rows[0].name;
          console.log('session name is set: ' + req.session.name)
          req.session.email = dbResult.rows[0].email;
          console.log('session email is set: ' + req.session.email)
          res.json({ message: "logged in successfully", name: req.session.name, email: req.session.email });
        } else {
          res.status(401).json("password is wrong");
        }
      } else {
        res.status(401).json("the email doesn't exist, sign up instead");
      }
    })
    .catch((reason) => {
      res.status(500).json("unknown error occurred");
    });
});

router.delete('/', (req, res) => {
  req.session.destroy();
  console.log("deleting session server side");
  res.json({ message: "session has been deleted" });
});
    
module.exports = router;
