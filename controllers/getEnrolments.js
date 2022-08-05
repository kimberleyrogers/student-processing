// move all the auth related server side functions here
const express = require('express');
const router = express.Router()
const axios = require('axios');
const convert = require('xml-js');
const db = require("../database/db.js");
const session = require('express-session');
require('dotenv').config()

// template for converting xml to json - specific to the call
function convertForAuthenticate(xmlString) {
  // # is specific to call and standard results - hacky as results may change
  const xmlStringMinusHeader = xmlString.slice(38)
  const unparsedJSON = convert.xml2json(xmlStringMinusHeader, {compact: true, spaces: 4});
  const parsedJSON = JSON.parse(unparsedJSON);
  const token = parsedJSON['soap:Envelope']['soap:Body']['ValidateClientResponse']['ValidateClientResult']['Token']
  return token
}


// converting xml to json - specific to the call
function convertGetEnrolments(xmlString) {
  const xmlStringMinusHeader = xmlString.slice(38)
  const unparsedJSON = convert.xml2json(xmlStringMinusHeader, {compact: true, spaces: 4});
  const parsedJSON = JSON.parse(unparsedJSON);
  const enrolmentArray = parsedJSON['soap:Envelope']['soap:Body']['GetEnrolmentsForClientResponse']['GetEnrolmentsForClientResult']
  return enrolmentArray
}

// template for how to make the api call, convert it to json and return to the server
router.post('/get_enrolments', (req, res) => {

  const studentId = req.body.studentId
  const userName = req.body.userName
  const userEmail = req.body.userEmail
  const vtUsername = process.env.VT_USERNAME
  const vtPassword = process.env.VT_PASSWORD
  let vtToken = ''

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

  // to get a new token from VT API 
  const authenticate = async() => {
  
    let xmlResult =

      await axios
      .post('https://sthservices.ozsoft.com.au/SIU_API/VT_API.asmx?WSDL', 
        xmlAuthenticate,
        {headers: 
            {'Content-Type': 'text/xml'}
        })
      .then((res) => {
        const converted = convertForAuthenticate(res.data.toString())

        return converted
      })
      .catch((err) => {
        console.log(`server side error: ${err}`)
      });
    return xmlResult
  }

  const sqlRetrieve = `
    SELECT vt_token FROM users WHERE email = ($1);
  `

  const sqlPutToken = `
    UPDATE users 
    SET vt_token = $1 
    WHERE email = $2;
  `


// https://stackoverflow.com/questions/7918868/how-to-escape-xml-entities-in-javascript
  const fixToken = (token) => {
    return token.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
  }

  const getEnrolments = async(vtToken) => {

    const xmlGetEnrolments2 = `<?xml version="1.0" encoding="utf-8"?>
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
        <GetEnrolmentsForClient xmlns="http://www.ozsoft.com.au/VETtrak/api/complete">
          <sToken>${vtToken}</sToken>
          <sClie_Code>${studentId}</sClie_Code>
        </GetEnrolmentsForClient>
      </Body>
    </Envelope>`

    const xmlGetEnrolments = `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <GetEnrolmentsForClient xmlns="http://www.ozsoft.com.au/VETtrak/api/complete">
            <sToken>${vtToken}</sToken>
            <sClie_Code>${studentId}</sClie_Code>
        </GetEnrolmentsForClient>
    </soap12:Body>
    </soap12:Envelope>`

    vtToken = vtToken
    let xmlResult =
      await axios
      .post('https://sthservices.ozsoft.com.au/SIU_API/VT_API.asmx?WSDL', 
        xmlGetEnrolments2,
        {headers: 
            {'Content-Type': 'text/xml'}
        })
      .then((res) => {
        const converted = convertGetEnrolments(res.data.toString())
        return converted
      })
      .catch((err) => {
        console.log(`server side error: `)
        console.log(err)
      });
    // console.log(xmlResult)
    return xmlResult
  }

  // retrieve token and get enrolments  
    authenticate()
    .then((result) => {

		vtToken = result['_text']
		let newToken = fixToken(vtToken)

		getEnrolments(newToken)
		.then((result) => {

			if (result != undefined) {
				if (result['Auth']['Status']['_text'] != 1) {
				res.status(500).json("the request to the external API didn't succeed")
				} else {
				res.json(result)
				}
			} else {
				res.status(500).json("the request to the external API didn't succeed - undefined")
			}
		})
		.catch((error) => {
		console.log("getenrolments - line 159 error is ")
		console.log(error)
		})
	})
    .catch((error) => {
        console.log("authenticate - line 163 error is ")
        console.log(error)
    })
});

module.exports = router