import './App.css';

export function GetEnrolments(props) {

    let setSelectedEnrolment = props.setSelectedEnrolment
    let studentName = props.studentName
    const searchResults = props.searchResults
    console.log(searchResults)
    console.log(searchResults[0]['ID'])
    

    return (
        <div>
            <h2>Student: {studentName}</h2>

            {searchResults.map((enrolment, index) => {

                return (

                    <div className="one-enrolment" onClick={() => setSelectedEnrolment(enrolment['Qual_Code']['_text'])} >
                        <p>Enrolment ID: {enrolment['ID']['_text']}</p>
                        <p>Studying: {enrolment['Qual_Code']['_text']} {enrolment['Qual_Name']['_text']}</p>
                        <p>Status: {enrolment['Status']['_text']}</p>
                    </div>
                )
            })} 
            </div>
    )
}
