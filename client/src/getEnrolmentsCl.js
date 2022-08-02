import axios from 'axios';
import { useEffect, useState } from 'react';

export function GetEnrolments(props) {

    // have variable like let ready = true
    // do first call, if status is -1, set ready to false and do Auth
    // after auth, store token, set ready to true
    // starts again
    // do call and if status is not -1 continue


    // API handshake, if live do the enr, if not, do the auth then the enr
    // will do the auth check - save the token
    // then enrolments by client search
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     axios
    //     .get('http://localhost:3000/handshake')
    //     .then((res) => {
    //         console.log(res.data)
    //         const response = res.data['_text']
    //         // setData(response)
    //     })
    //     .catch((err) => {
    //         console.log(err.response.data)});
    // },[])
    

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

    const studentId = props.searchTerm
    const [student, setStudent] = useState('waiting for search results')
    const [searchResults, setSearchResults] = useState('no results yet')
    let studentName = ""
    let firstName = ""
    let surname = ""
    let enrolmentArray =[]

    useEffect(() => {
        axios
        .get(`http://localhost:3000/get_enrolments/${studentId}`)
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
    },[])

    return (
        <div>
            <button>Refresh token</button>
            <h2>Student INFO: {student}</h2>
        
            {/* {searchResults.map((enrolment, index) => {

                return (
                    <div>
                        <p>{enrolment['ID']['_text']}</p>
                        <p>{enrolment['Qual_Code']['_text']}</p>
                        <p>{enrolment['Qual_Name']['_text']}</p>
                        <p>{enrolment['Status']['_text']}</p>
                    </div>
                )
            })} */}
        </div>
    )
}
