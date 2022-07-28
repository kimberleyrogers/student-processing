import { vtPassword, vtUsername, canvasKey } from './kim.js';
import axios from 'axios';
// cors middleware?
const convert = require('xml-js');





const xmlString = `
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <GetEnrolmentsForClientResponse xmlns="http://www.ozsoft.com.au/VETtrak/api/complete">
            <GetEnrolmentsForClientResult>
                <Auth>
                    <ID>3037</ID>
                    <Token>'&amp;7%+&gt;-"6(+!56$0&gt;345</Token>
                    <Status>1</Status>
                    <Identifier>03037</Identifier>
                    <TokenType>02</TokenType>
                </Auth>
                <ClieEnroList>
                    <TClieEnro>
                        <ID>11309</ID>
                        <StartDate>2019-01-01T00:00:00</StartDate>
                        <EndDate>2019-03-06T00:00:00</EndDate>
                        <Status>Completed</Status>
                        <StatusType>1</StatusType>
                        <DateOfEffect>2019-03-07T00:00:00</DateOfEffect>
                        <Qual_Code>FA</Qual_Code>
                        <Qual_Name>First Aid </Qual_Name>
                        <OrganisationId>2</OrganisationId>
                        <Loca_Code>LLTTR</Loca_Code>
                        <DeliveryModes>
                            <string>Internal delivery</string>
                        </DeliveryModes>
                        <Amount>0.00</Amount>
                        <GST>0.00</GST>
                        <AmountPaid>0.00</AmountPaid>
                        <AmountCredited>0.00</AmountCredited>
                        <DivisionId>1</DivisionId>
                        <Clie_Code>03037</Clie_Code>
                        <GivenName>Kimberley</GivenName>
                        <Surname>Rogers</Surname>
                    </TClieEnro>
                    <TClieEnro>
                        <ID>17006</ID>
                        <StartDate>2021-06-17T00:00:00</StartDate>
                        <EndDate>2022-02-17T00:00:00</EndDate>
                        <Status>Pre-Reporting Withdrawal</Status>
                        <StatusType>9</StatusType>
                        <DateOfEffect>2021-08-26T00:00:00</DateOfEffect>
                        <Qual_Code>SIT40416-</Qual_Code>
                        <Qual_Name>Certificate IV in Hospitality - Part of a Dual Qualification</Qual_Name>
                        <OrganisationId>2</OrganisationId>
                        <Loca_Code>617 HRG</Loca_Code>
                        <DeliveryModes>
                            <string>External delivery</string>
                            <string>Internal delivery</string>
                            <string>Workplace-based</string>
                        </DeliveryModes>
                        <Amount>0.00</Amount>
                        <GST>0.00</GST>
                        <AmountPaid>0.00</AmountPaid>
                        <AmountCredited>0.00</AmountCredited>
                        <DivisionId>1</DivisionId>
                        <Clie_Code>03037</Clie_Code>
                        <GivenName>Kimberley</GivenName>
                        <Surname>Rogers</Surname>
                    </TClieEnro>
                </ClieEnroList>
            </GetEnrolmentsForClientResult>
        </GetEnrolmentsForClientResponse>
    </soap:Body>
</soap:Envelope>
  `

// call API to get token - returns XML
// CORS issue - https://stackoverflow.com/questions/35588699/response-to-preflight-request-doesnt-pass-access-control-check
// next step try from heroku to see if it's just a local host issue?

export function Authenticate(user, pw) {

    const xmlAuthenticate = `
        <?xml version="1.0" encoding="utf-8"?>
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
    .post('http://sthservices.ozsoft.com.au/SIU_API/VT_API.asmx?WSDL', 
        xmlAuthenticate,
        {headers: 
            {'Content-Type': 'text/xml'}
        })
    .then((res) => {
        console.log('reached .then')
        console.log(res);
    })
    .catch((err) => {
        console.log(err.response.data)});
}


// call API - using token to GetEnrolmentsByClient - returns XML



// function for turning XML into JSON - GetEnrolmentsByClientID
// needs work so it works for multiple results, not just one
export function Convert(props) {
    const result1 = convert.xml2json(props.xml, {compact: true, spaces: 4});
    let parsed = JSON.parse(result1);
    let readableInfo = parsed['soap:Envelope']['soap:Body']['GetEnrolmentsForClientResponse']['GetEnrolmentsForClientResult']['ClieEnroList']['TClieEnro']
    let readableInfoResult1 = readableInfo[0]
    console.log(readableInfoResult1)
    let readableInfoResult2 = readableInfo[1]
    return readableInfoResult1['Qual_Name']['_text']
}

