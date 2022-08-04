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

    // useEffect(() => {
    //     axios
    //     .get('/api/session')
    //     .then((res) => {
    //         if(res.data.name) {
    //             console.log(`logged in - ${res.data.name}`)
    //             // if session info exists
    //             const userName = res.data['name']
    //             setLoggedIn(true)
    //             setUser(userName)
    //         } else {
    //             console.log(`not logged in - ${res}`)
    //         }  
    //     })
    //     .catch((err) => {
    //         console.log(err.response.data)});
    // },[])
    // if not logged in, show login page with a link to sign up
    // if logged in, show </Search />

    return (
        <div id='home-page'>
            <div id="home-first-column">
                {loggedIn == true ?
                <div><h1>Hi {user}, you're logged in.</h1> <Search user={user} setUser={setUser} userEmail={userEmail} setUserEmail={setUserEmail}/></div> :
                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} userEmail={userEmail} setUserEmail={setUserEmail}/>}
            </div>
            <div id="home-second-column">
                {loggedIn == true ?
                <Form /> :
                <p></p>}
            </div>
        </div>
    )
}

function AboutPage() {
    return (
        <div>
            <h1>about this site</h1>
            <p>This site has been created to solve a real world problem.</p>
            <p>In my RTO workplace a student withdrawing from a course brings an administration nightmare.</p>
            <p>Since I wasn't able to win the admin battle, I made an app to do the job instead. The site contacts the VETtrak API, allows the user to find a student and the enrolment from which they are withdrawing, the user enters some details and generates all needed paperwork.</p>
            <p>This project was it's own kind of nightmare.</p>
            <h2>created by Kimberley Rogers</h2>
            <br></br>
            <a href="/"><h2>back to the app</h2></a>

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
