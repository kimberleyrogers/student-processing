import { useEffect, useState } from 'react';
import './form.css';

// Form for user to complete

export function Form() {

    // state for form fields
    const [wdType, setWdType] = useState('');
    const [wdDate, setWdDate] = useState('')
    const [wdReason, setWdReason] = useState('')
    const [pstacd, setpstacd] = useState('');
    const [cpnDate, setCpnDate] = useState('')
    const [cpnTrainer, setCpnTrainer] = useState('')
    const [cpnComments, setCpnComments] = useState('');
   
{/* <PDFFile />
        <PDFDownloadLink document={<PDFFile />} filename="Withdrawal Form - Student Name - Student Number">
            {({loading}) => (loading ? (<button>Loading document...</button>) : (<button>Download</button>))}
        </PDFDownloadLink> */} 


    return (
        <form >
            <h2>withdrawal information</h2>
            <label>
                type of withdrawal
                <select>
                    <option value='formal'>formal</option>
                    <option value='apparent'>apparent</option>
                </select>
            </label>
            <label>
                date of withdrawal
                <input 
                    type="date"
                    required
                    value={wdDate}
                />
            </label>
            <label>
                reason for withdrawal
                <input 
                    type="text"
                    required
                    value={wdReason}
                />
            </label>
            <label>
                PSTACD
                <input 
                    type="date"
                    required
                    value={pstacd}
                />
            </label>
            <h2>CPN information</h2>
            <label>
                date
                <input 
                    type="date"
                    required
                    value={cpnDate}
                />
            </label>
            <label>
                trainer
                <input 
                    type="text"
                    required
                    value={cpnTrainer}
                />
            </label>
            <label>
                comments 
                <textarea 
                    type="text"
                    required
                    value={cpnComments}
                />
            </label>
            <input id='form-submit-button' type="submit" />
        </form>
    )


}

//     // db query to get token from db, or retrieve new one and store if no token
//   db.query(sqlRetrieve, [userEmail])
//   .then(dbResult => {
//       if (dbResult.rows[0]['vt_token'] != null) {
//         vtToken = dbResult.rows[0]['vt_token']
//         getEnrolments(vtToken)
//             .then((result) => {
//             console.log(`line 98 result is: `)
//             console.log(result)
//             if (result['Auth']['Status']['_text'] != 1) {
//               // res.status(500).json("the request to the external API didn't succeed")
//               authenticate()
//               .then((result) => {
//                 vtToken = result['_text']
//                 db.query(sqlPutToken, [vtToken, userEmail])
//                 .then(dbResult => {
//                   getEnrolments(vtToken)
//                   .then((result) => {
//                     console.log(`line 158 result is: `)
//                     console.log(result)
//                     res.json(result)
//                   })
//                 })
//               })
//             } else {
//               res.json(result)
//             }
//         })
//       } else {
//         authenticate()
//         .then((result) => {
//           vtToken = result['_text']
//           db.query(sqlPutToken, [vtToken, userEmail])
//           .then(dbResult => {
//             getEnrolments(vtToken)
//             .then((result) => {
//               console.log(`line 109 result is: `)
//               console.log(result)
//             })
//           })
//           .catch(reason => {
//             console.log('line 115')
//             console.log(reason)
//             res.status(500).json("unknown error occurred")
//           })
//         })
//       }
//   })
//   .catch((error) => {
//       console.log("line 59 error is ")
//       console.log(error)
//   })