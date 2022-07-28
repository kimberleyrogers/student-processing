const express = require('express');
const axios = require('axios');
const pg = require('pg');
const { response } = require('express');
require('dotenv').config()

// const port = 3001;
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('client'))

app.use((req, res, next) => {
  console.log(`${new Date()} ${req.method} ${req.path}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()
})
// <?xml version="1.0" encoding="utf-8"?>
app.get('/auth', (req, res) => {

  const vtUsername = process.env.VT_USERNAME
  const vtPassword = process.env.VT_PASSWORD

  const xmlAuthenticate = `
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <ValidateClient xmlns="http://www.ozsoft.com.au/VETtrak/api/complete">
        <sUsername>${vtUsername}</sUsername>
        <sPassword>${vtPassword}</sPassword>
        </ValidateClient>
    </soap12:Body>
    </soap12:Envelope>
  `
    axios
    .post('https://sthservices.ozsoft.com.au/SIU_API/VT_API.asmx?WSDL', 
      xmlAuthenticate,
      {headers: 
          {'Content-Type': 'text/xml'}
      })
    .then((res) => {
      console.log(`sending the response from server to client`)
      console.log(res.data)
     // need to return the info - why is my brain failing?
    })
    .catch((err) => {
      console.log(`server side error: ${err}`)
    });
});


app.get('/hello', (req, res) => {
  res.send('hello this is your server speaking')
});

// router.get('/api/challenges/:id', (request, response) => {
//   let id = request.params.id;
//   const sql = `
//   SELECT * FROM challenges WHERE id = ${id}
//   `
//   db.query(sql)
//       .then((dbResult) => {
//           response.json(dbResult.rows)
//   })
// })

app.listen(port, () => {
  console.log(`server listening on port: ${port}`)
});