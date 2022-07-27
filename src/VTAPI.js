const convert = require('xml-js');

// content of this was taken from https://www.delftstack.com/howto/javascript/javascript-xml-to-json/
// const regex = "/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\\1).)*)(?:<\/\\1>)|<(\w*)(?:\s*)*\/>/gm";

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
// const result1 = convert.xml2json(xmlString, {compact: true, spaces: 4});
// const result2 = convert.xml2json(xmlString, {compact: false, spaces: 4});
// console.log(result1, '\n', result2);

function Convert(props) {
    const result1 = convert.xml2json(props.xml, {compact: true, spaces: 4});
    // console.log(result1)
    // let result2 = result1["_declaration"]
    // console.log(result2)
    // let result3 = result1[0]
    // console.log(result3)
    let parsed = JSON.parse(result1);
    // console.log(parsed)
    let readableInfo = parsed['soap:Envelope']['soap:Body']['GetEnrolmentsForClientResponse']['GetEnrolmentsForClientResult']['ClieEnroList']['TClieEnro']
    // console.log(readableInfo)
    let readableInfoResult1 = readableInfo[0]
    console.log(readableInfoResult1)
    let readableInfoResult2 = readableInfo[1]
    return readableInfoResult1['Qual_Name']['_text']
}

// console.log(Convert(xmlString))

export default Convert;