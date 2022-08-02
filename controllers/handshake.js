// move all the auth related server side functions here
const express = require('express');
const router = express.Router()
const axios = require('axios');
const convert = require('xml-js');

// template for converting xml to json - specific to the call
// function convertForAuthenticate(xmlString) {
//     // # is specific to call and standard results - hacky as results may change
//     const xmlStringMinusHeader = xmlString.slice(38)
//     const unparsedJSON = convert.xml2json(xmlStringMinusHeader, {compact: true, spaces: 4});
//     const parsedJSON = JSON.parse(unparsedJSON);
//     // console.log(`parsedJSON is: ${parsedJSON}`)
//     const token = parsedJSON['soap:Envelope']['soap:Body']['ValidateClientResponse']['ValidateClientResult']['Token']
//     return token
//     //commit to database
// }

// template for how to make the api call, convert it to json and return to the server
router.get('/handshake', (req, res) => {
  
    const xmlHandshake = `
        <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <API_Handshake xmlns="http://www.ozsoft.com.au/VETtrak/api/complete"/>
        </Body>
        </Envelope>
    `

    const handshake = async() => {
  
      let xmlResult =
  
        await axios
        .post('https://sthservices.ozsoft.com.au/SIU_API/VT_API.asmx?WSDL', 
          xmlHandshake,
          {headers: 
              {'Content-Type': 'text/xml'}
          })
        .then((res) => {
          console.log(`line 67: ${res.data}`)
        //   const converted = convertForAuthenticate(res.data.toString())
        //   console.log('converted is... ' + converted)
        //   return converted
        })
        .catch((err) => {
          console.log(`server side error: ${err}`)
        });
      // console.log(xmlResult)
      return xmlResult
    }
    
    // next - don't return token, hash it and store in DB
    authenticate()
      .then((result) => res.send(result))
});

module.exports = router