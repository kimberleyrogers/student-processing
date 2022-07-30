const express = require('express');
const axios = require('axios');
const pg = require('pg');
const { response } = require('express');
const convert = require('xml-js');
const XMLWriter = require('xml-writer');
require('dotenv').config()

// const port = 3001;
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('client'))

// template for converting xml to json - specific to the call
function convertForAuthenticate(xmlString) {
  // # is specific to call and standard results - hacky as results may change
  const xmlStringMinusHeader = xmlString.slice(38)
  const unparsedJSON = convert.xml2json(xmlStringMinusHeader, {compact: true, spaces: 4});
  const parsedJSON = JSON.parse(unparsedJSON);
  // console.log(`parsedJSON is: ${parsedJSON}`)
  const token = parsedJSON['soap:Envelope']['soap:Body']['ValidateClientResponse']['ValidateClientResult']['Token']
  return token
}

app.use((req, res, next) => {
  console.log(`${new Date()} ${req.method} ${req.path}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()
})


// template for how to make the api call, convert it to json and return to the server
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

  const authenticate = async() => {

    let xmlResult =

      await axios
      .post('https://sthservices.ozsoft.com.au/SIU_API/VT_API.asmx?WSDL', 
        xmlAuthenticate,
        {headers: 
            {'Content-Type': 'text/xml'}
        })
      .then((res) => {
        // console.log(`line 67: ${res.data}`)
        // const returnValueHeaderRemoved = res.data.toString().slice(38)
        const converted = convertForAuthenticate(res.data.toString())
        // console.log('converted is... ' + converted)
        return converted
      })
      .catch((err) => {
        console.log(`server side error: ${err}`)
      });
    // console.log(xmlResult)
    return xmlResult
  }

   authenticate()
    .then((result) => res.send(result))
});


app.get('/hello', (req, res) => {
  res.send('hello this is your server speaking')
});


app.listen(port, () => {
  console.log(`server listening on port: ${port}`)
});