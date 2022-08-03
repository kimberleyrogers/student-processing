import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetEnrolments } from './getEnrolmentsCl';
const convert = require('xml-js');
const ReactDOM = require('react-dom');

export function Search(user, setUser, userEmail, setUserEmail) {

    // all of the state needs to be here for child components... I think

    const [searchTerm, setSearchTerm] = useState('09381');
    const [submitSearch, setSubmitSearch] = useState(false);
    const [searchResults, setSearchResults] = useState('no results yet')
    const [studentName, setStudent] = useState('waiting for search results')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitSearch(true);
        //call get enrolments here with search term, then render the results inside getenrolments
        
        let userName = user['user']
        let emailAdd = user['userEmail']

        let studentName = ""
        let firstName = ""
        let surname = ""
        let enrolmentArray =[]

        axios
        .post(`http://localhost:3000/get_enrolments`, {
            studentId: searchTerm,
            userName: userName,
            userEmail: emailAdd
        })
        .then((res) => {
            console.log(res.data)
            // extract student name + update state
            firstName = res.data['ClieEnroList']['TClieEnro'][0]['GivenName']['_text']
            surname = res.data['ClieEnroList']['TClieEnro'][0]['Surname']['_text']
            studentName = `${firstName} ${surname}`
            console.log(`student name is ${studentName}`)
            setStudent(studentName)
            // update array variable and state, display below
            enrolmentArray = res.data['ClieEnroList']['TClieEnro']
            console.log(enrolmentArray)
            setSearchResults(enrolmentArray)


            // iterate through all objects in the array, and unpack them
            // const response = res.data['_text']
            
        })
        .catch((err) => {
            // if
            console.log(err.response)});
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
            {/* get enrolments just displays the results */}
            {submitSearch === false ? <NoSearch /> : <GetEnrolments studentName={studentName} />}
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
