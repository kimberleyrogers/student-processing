import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetEnrolments } from './getEnrolmentsCl';
import { Form } from './Form2';
import './App.css';
const ReactDOM = require('react-dom');

export function Search(user, setUser, userEmail, setUserEmail, loggedIn, setLoggedIn) {

    // all of the state needs to be here for child components

    const [searchTerm, setSearchTerm] = useState('');
    const [submitSearch, setSubmitSearch] = useState(false);
    const [searchResults, setSearchResults] = useState('')
    const [studentName, setStudent] = useState('waiting for search results')
    const [selectedEnrolmentQual, setSelectedEnrolmentQual] = useState(null)
    
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
        .post(`/get_enrolments`, {
            studentId: searchTerm,
            userName: userName,
            userEmail: emailAdd
        })
        .then((res) => {
            console.log('data from server')
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
        .catch((error) => {
            if (error.response) {
                console.log("error.response.data");
                console.log(error.response.data);
                console.log("error.response.headers");
                console.log(error.response.headers);
                console.log("error.response.headers");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request)
            } else {
                console.log('error.message')
                console.log(error.message)
            }
        })
    }

    return (
        <div id="search-container">
            <div id="search-row1">
                {submitSearch === false ?  <p>Search for the student you are withdrawing.</p> : <p></p>}
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
            </div>
            <div id="search-first-column">
                
           
            {searchResults && submitSearch === true ? <GetEnrolments studentName={studentName} searchResults={searchResults} setSelectedEnrolmentQual={setSelectedEnrolmentQual}/> : <p></p>}
            </div>
            <div id="search-second-column">
    
                <Form studentName={studentName} setSelectedEnrolmentQual={setSelectedEnrolmentQual}/>
            </div>
        </div> 
    )
}
