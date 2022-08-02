import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetEnrolments } from './getEnrolmentsCl';
const convert = require('xml-js');
const ReactDOM = require('react-dom');

export function Search() {

    // all of the state needs to be here for child components... I think

    const [searchTerm, setSearchTerm] = useState('09381');
    const [submitSearch, setSubmitSearch] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitSearch(true);
    }
    console.log(searchTerm)

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
            </form>
            {submitSearch === false ? <NoSearch /> : <GetEnrolments studentId={searchTerm} />}
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
