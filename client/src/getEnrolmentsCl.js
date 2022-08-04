import axios from 'axios';
import { useEffect, useState } from 'react';
import './enrolments.css';

export function GetEnrolments(props) {

    const [selectedEnrolment, setSelectedEnrolment] = useState(null)
    let studentName = props.studentName
    console.log(props.searchResults)
    const searchResults = props.searchResults
    console.log(searchResults[0]['ID'])
    

    return (
        <div>
            {/* <button>Refresh token</button> */}
            <h2>Student INFO: {studentName}</h2>
        
    
        
            {searchResults.map((enrolment, index) => {

                return (

                    <div class="enrolment-item" onClick={() => selectedEnrolment(enrolment)} >
                        <p>Enrolment ID: {enrolment['ID']['_text']}</p>
                        <p>Studying: {enrolment['Qual_Code']['_text']} {enrolment['Qual_Name']['_text']}</p>
                        <p>Status: {enrolment['Status']['_text']}</p>
                    </div>
                )
            })} 
            </div>
    )
}
