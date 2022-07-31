import axios from 'axios';
import { useEffect, useState } from 'react';
const convert = require('xml-js');
var ReactDOM = require('react-dom');

export function Search() {

    // all of the state needs to be here for child components... I think

    const [searchTerm, setSearchTerm] = useState('');
    const [submitSearch, setSubmitSearch] = useState(false);
    

    // useEffect(() => {
    //     axios
    //     .get('http://localhost:3000/auth')
    //     .then((res) => {
    //         const response = res.data['_text']
    //         setData(response)
    //     })
    //     .catch((err) => {
    //         console.log(err.response.data)});
    // },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitSearch(true);
        console.log("it's true")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    SEARCH:
                    <input 
                        type="text"
                        required
                        value={searchTerm}
                        onChange ={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
                <input type="submit" />
                <button>search for { searchTerm }</button>
            </form>
            {/* ternary for search results */}
            {submitSearch === false ? <NoSearch /> : <GetEnrolmenties studentId={searchTerm} />}
            
        </div>
        
    )
}

function NoSearch() {

    return (
        <div>
            <p>No search yet, please search for a student</p>
        </div>
    )
}

function GetEnrolmenties(props) {

    return (
        <div>
            <p>search placeholder</p>
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

