import axios from "axios";
import { useState } from "react";
import './App.css';


export function Login({ loggedIn, setLoggedIn, user, setUser, userEmail, setUserEmail }) {

    const [submitLogin, setSubmitLogin] = useState(false);
    const [loginSignup, setLoginSignup] = useState('login')

    const handleloginSignupChange = (e) => {
        e.preventDefault();
        loginSignup === 'login' ? setLoginSignup('signup') : setLoginSignup('login');
    }

    return (
        <div>
            {loginSignup === 'login' ? 
                <LoginForm handleloginSignupChange={handleloginSignupChange} loginSignup={loginSignup} setLoginSignup={setLoginSignup} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} userEmail={userEmail} setUserEmail={setUserEmail}/> :
                <SignUpForm handleloginSignupChange={handleloginSignupChange} />
            }
        </div>
    )
}

export function LoginForm({ user, setUser, handleloginSignupChange, loginSignup, setLoginSignup, loggedIn, setLoggedIn, userEmail, setUserEmail }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFail, setLoginFail] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('you need both an email and password to log in')
        } else {
            axios
            .post('/api/session/', {
                email: email,
                password: password
            })
            .then((res) => {
                setLoggedIn(true)
                setUser(res.data.name)
                setUserEmail(res.data.email)
            })
            .catch((err) => {
                if (err.response.data.message === 'password is wrong') {
                    console.log('password is not right')
                    setLoginFail(true)
                } else if (err.response.data.message === "the email doesn't exist, sign up instead") {
                    console.log("email not registered, sign up instead")
                    setLoginFail(true)
                }
            })
        }
    }

    return (
        <div>
            <h1>log into your account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    EMAIL:
                    <input 
                        type="email"
                        required
                        value={email}
                        onChange ={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    PASSWORD:
                    <input 
                        type="password"
                        required
                        value={password}
                        onChange ={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input className="black-button" type="submit" />
            </form>
            <h4>need to sign up?</h4>
            <button onClick={handleloginSignupChange}>create an account</button>
            {loginFail === true ? <p>your credentials are not correct, try again</p> : <p></p>}
        </div> 
    )
}

function SignUpForm(handleloginSignupChange) {

    const [name, setName] = useState('');   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        

        if (!name || !email || !password) {
            alert('you need to provide all details to sign up')
        } else {
            axios
            .post('/new_user', {
                name: name,
                email: email,
                password: password
            })
            .then((res) => {
                setSignedUp(true)
            })
            .catch((err) => {
                if (err.response.data.message === "email already exists") {
                    console.log('There is already an account with that email - login')
                }
                console.log(err)
            })
        }
    }

    return (
        <div>
            <h1>create an account</h1>
            <form onSubmit={handleSubmit}>
                <h2>your information</h2>
                <label>
                    NAME:
                    <input 
                        type="text"
                        required
                        value={name}
                        onChange ={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    EMAIL:
                    <input 
                        type="email"
                        required
                        value={email}
                        onChange ={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    PASSWORD:
                    <input 
                        type="password"
                        required
                        value={password}
                        onChange ={(e) => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
            
            {signedUp === true ? 
                <div>
                    <h4>Congrats, you've created an account, login below.</h4>
                    <button onClick={handleloginSignupChange}>log into your account</button>
                </div>:
                <div>
                    <h4>already have an account?</h4>
                    <button onClick={handleloginSignupChange}>log into your account</button>
                </div>
            }
        
        </div> 
    )
}

