// move all the auth related server side functions here
const express = require('express');
const router = express.Router()
const axios = require('axios');
const convert = require('xml-js');
const bcrypt = require('bcrypt')

// converting xml to json - specific to the call
function convertGetEnrolments(xmlString) {
  // console.log(`xmlString line 9 is ${xmlString}`)
  // # is specific to call and standard results - hacky as results may change
  const xmlStringMinusHeader = xmlString.slice(38)
  // console.log(`xmlStringMinusHeader line 12 is ${xmlStringMinusHeader}`)
  const unparsedJSON = convert.xml2json(xmlStringMinusHeader, {compact: true, spaces: 4});
  const parsedJSON = JSON.parse(unparsedJSON);
  //view parsed JSON and see how to edit line 15 to get what you need
  console.log(`parsedJSON is: ${parsedJSON}`)

  const enrolmentArray = parsedJSON['soap:Envelope']['soap:Body']['GetEnrolmentsForClientResponse']['GetEnrolmentsForClientResult']
  console.log(`original array: ${enrolmentArray}`)
  return enrolmentArray
  //commit to database
}


// template for how to make the api call, convert it to json and return to the server
router.get('/get_enrolments/:studentId', (req, res) => {

  const studentId = req.params.studentId
  console.log(studentId)
  // currently pulling from dotenv - needs to come from user being logged in
  // const vtUsername = process.env.VT_USERNAME
  // const vtPassword = process.env.VT_PASSWORD
  // const vtToken = process.env.VT_TOKEN

  // check session ID in DB - get token
  // if token is null - do validate client call - store token - return token
  // if token exists return token
  // do API call as below

  // handles login, setting session

  const checkSession = async() => {
    let sessionInfo = await axios.get('/session')
    console.log(sessionInfo.id)
    return sessionInfo.id
  }

  let userToken = ''

  checkSession()
  .then((result) => {
    console.log(result)
    const sql = `
    SELECT vt_token_hash FROM users WHERE id = ($1);
    `
    db.query(sql, [result])
    .then(dbResult => {

      console.log('line 60' +  dbResult.rows)

      if (dbResult.rows != "") {
        console.log('line 63')
      } else {res.status(401).json("rows is empty")}
    })
    .catch((error) => {
      res.status(500).json("error is " + error)
    })
  })


  
    const xmlGetEnrolments = `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
          <GetEnrolmentsForClient xmlns="http://www.ozsoft.com.au/VETtrak/api/complete">
              <sToken>${vtToken}</sToken>
              <sClie_Code>${studentId}</sClie_Code>
          </GetEnrolmentsForClient>
      </Body>
      </Envelope>
    `

    const getEnrolments = async() => {
  
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

    // next - don't return token, hash it and store in DB
    getEnrolments()
      .then((result) => 
      console.log(`line 74 result is: ${result}`))
      // if status = -1, call Auth.
      // res.send(result))
});

module.exports = router