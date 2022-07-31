import './App.css';
import PDFFile from './PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Convert, Search } from './searchCl';
import { GetEnrolments } from './getEnrolmentsCl';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";


function HomePage() {
    return (
        <div id='home-page'>
            <div id="home-first-column">
                <Search />
            </div>
            <div id="home-second-column">
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
