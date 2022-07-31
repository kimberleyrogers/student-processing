import axios from 'axios';
import { useEffect, useState } from 'react';

export function GetEnrolments(props) {

    const studentId = props.studentId
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
            // extract student name, id and update state
            // setData(response)
            firstName = res.data['ClieEnroList']['TClieEnro'][0]['GivenName']['_text']
            surname = res.data['ClieEnroList']['TClieEnro'][0]['Surname']['_text']
            studentName = `${firstName} ${surname}`
            console.log(`student name is ${studentName}`)
            setStudent(studentName)


            // iterate through all objects in the array, and unpack them
            // const response = res.data['_text']
            
        })
        .catch((err) => {
            console.log(err.response.data)});
    },[])

    return (
        <div>
            <h2>Student INFO: {student}</h2>

            
        </div>
        
    )
}

{/* <div onClick={() => selectFilm(film)} >

<FilmRow 
  img={`https://image.tmdb.org/t/p/w780` + film.poster_path} 
  title={film.title} 
  year={film.release_date} 
  key={index}
/>

</div>)})}
</div> */}