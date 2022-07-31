import axios from 'axios';
import { useEffect, useState } from 'react';
const convert = require('xml-js');
var ReactDOM = require('react-dom');

export function AuthenticateFromServer() {

    const [data, setData] = useState('waiting for token')

    useEffect(() => {
        axios
        .get('http://localhost:3000/auth')
        .then((res) => {
            const response = res.data['_text']
            setData(response)
        })
        .catch((err) => {
            console.log(err.response.data)});
    },[])

    return (
        <div>
            <p>Token is: {data}</p>
            <button onClick={() => {
                ReactDOM.unmountComponentAtNode(AuthenticateFromServer)}}>Done with this part</button>
        </div>
        
    )
}

// call API - using token to GetEnrolmentsByClient - returns XML

// function for turning XML into JSON - GetEnrolmentsByClientID
// needs work so it works for multiple results, not just one
export function Convert(props) {
    const result1 = convert.xml2json(props.xml, {compact: true, spaces: 4});
    let parsed = JSON.parse(result1);
    let readableInfo = parsed['soap:Envelope']['soap:Body']['GetEnrolmentsForClientResponse']['GetEnrolmentsForClientResult']['ClieEnroList']['TClieEnro']
    let readableInfoResult1 = readableInfo[0]
    // console.log(readableInfoResult1)
    let readableInfoResult2 = readableInfo[1]
    return readableInfoResult1['Qual_Name']['_text']
}

