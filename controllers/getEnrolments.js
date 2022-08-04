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
  // console.log(`parsedJSON is: ${parsedJSON}`)
  const token = parsedJSON['soap:Envelope']['soap:Body']['ValidateClientResponse']['ValidateClientResult']['Token']
  return token
  //commit to database
}


// converting xml to json - specific to the call
function convertGetEnrolments(xmlString) {
  const xmlStringMinusHeader = xmlString.slice(38)
  const unparsedJSON = convert.xml2json(xmlStringMinusHeader, {compact: true, spaces: 4});
  const parsedJSON = JSON.parse(unparsedJSON);
  console.log(`parsedJSON is: `)
  console.log(parsedJSON)
  const enrolmentArray = parsedJSON['soap:Envelope']['soap:Body']['GetEnrolmentsForClientResponse']['GetEnrolmentsForClientResult']
  console.log(`enrolment array: `)
  console.log(enrolmentArray)
  return enrolmentArray
}


// template for how to make the api call, convert it to json and return to the server
router.post('/get_enrolments', (req, res) => {

  const studentId = req.body.studentId
  const userName = req.body.userName
  const userEmail = req.body.userEmail
  const vtUsername = process.env.VT_USERNAME
  const vtPassword = process.env.VT_PASSWORD
  console.log(`on server side ${userName} and ${userEmail} and ${studentId}`)
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
  // to get a new token from VT API if token doesn't exist or has expired
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

  const sqlRetrieve = `
    SELECT vt_token FROM users WHERE email = ($1);
  `

  const sqlPutToken = `
    UPDATE users 
    SET vt_token = $1 
    WHERE email = $2;
  `

  // const xmlGetEnrolments = `
  //     <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
  //     <Body>
  //         <GetEnrolmentsForClient xmlns="http://www.ozsoft.com.au/VETtrak/api/complete">
  //             <sToken>${vtToken}</sToken>
  //             <sClie_Code>${studentId}</sClie_Code>
  //         </GetEnrolmentsForClient>
  //     </Body>
  //     </Envelope>
  //   `

  const getEnrolments = async(vtToken) => {
    const xmlGetEnrolments = `
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
        <GetEnrolmentsForClient xmlns="http://www.ozsoft.com.au/VETtrak/api/complete">
            <sToken>${vtToken}</sToken>
            <sClie_Code>${studentId}</sClie_Code>
        </GetEnrolmentsForClient>
    </soap12:Body>
    </soap12:Envelope>
  `

    vtToken = vtToken
    // console.log('checking the vttoken and student ID is okay')
    // console.log(vtToken)
    // console.log(studentId)
    // console.log('xmlgetenrolments')
    // console.log(xmlGetEnrolments)
    let xmlResult =
      await axios
      .post('https://sthservices.ozsoft.com.au/SIU_API/VT_API.asmx?WSDL', 
      xmlGetEnrolments,
        {headers: 
            {'Content-Type': 'text/xml'}
        })
      .then((res) => {
        const converted = convertGetEnrolments(res.data.toString())
        return converted
      })
      .catch((err) => {
        console.log(`server side error: ${err}`)
      });
    // console.log(xmlResult)
    return xmlResult
  }

  // db query to get token from db, or retrieve new one and store if no token
  db.query(sqlRetrieve, [userEmail])
  .then(dbResult => {
      if (dbResult.rows[0]['vt_token'] != null) {
        vtToken = dbResult.rows[0]['vt_token']
        getEnrolments(vtToken)
            .then((result) => {
            console.log(`line 98 result is: `)
            console.log(result)
            if (result['Auth']['Status']['_text'] != 1) {
              res.status(500).json("the request to the external API didn't succeed")
            } else {
              res.json(result)
            }
        })
      } else {
        authenticate()
        .then((result) => {
          vtToken = result['_text']
          db.query(sqlPutToken, [vtToken, userEmail])
          .then(dbResult => {
            getEnrolments(vtToken)
            .then((result) => {
              console.log(`line 109 result is: `)
              console.log(result)
            })
          })
          .catch(reason => {
            console.log('line 115')
            console.log(reason)
            res.status(500).json("unknown error occurred")
          })
        })
      }
  })
  .catch((error) => {
      console.log("line 59 error is ")
      console.log(error)
  })

});

module.exports = router