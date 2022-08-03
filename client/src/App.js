import './App.css';
import PDFFile from './PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Convert, Search } from './searchCl';
import { Login } from './login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from './form';

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";


function HomePage() {

    // const [searchTerm, setSearchTerm] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState('')
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        axios
        .get('/api/session')
        .then((res) => {
            if(res.data.name) {
                console.log(`logged in - ${res.data.name}`)
                // if session info exists
                const userName = res.data['name']
                setLoggedIn(true)
                setUser(userName)
            } else {
                console.log(`not logged in - ${res}`)
            }  
        })
        .catch((err) => {
            console.log(err.response.data)});
    },[])
    // if not logged in, show login page with a link to sign up
    // if logged in, show </Search />

    return (
        <div id='home-page'>
           
            <div id="home-first-column">
            <p>Logged in as {user} using {userEmail}</p>
                {/* <Search /> */}
                {loggedIn == true ?
                <Search user={user} setUser={setUser} userEmail={userEmail} setUserEmail={setUserEmail}/> :
                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} userEmail={userEmail} setUserEmail={setUserEmail}/>}
            </div>
            <div id="home-second-column">
                <Form />
                {/* <GetEnrolments studentId={`09381`}/> */}
            </div>
            
        {/* <PDFFile />
        <PDFDownloadLink document={<PDFFile />} filename="Withdrawal Form - Student Name - Student Number">
            {({loading}) => (loading ? (<button>Loading document...</button>) : (<button>Download</button>))}
        </PDFDownloadLink> */} 
        </div>
    )
}

function AboutPage() {
    return (
        <div>
            <p>About</p>
        </div>
    )
}

function App() {
  // if there is a session cookie, go to HomePage, otherwise go to LoginPage
    return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
