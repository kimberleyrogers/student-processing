import axios from "axios";
import { useState, useRef } from "react";


export function Login({ loggedIn, setLoggedIn }) {

    const [submitLogin, setSubmitLogin] = useState(false);
    const [loginSignup, setLoginSignup] = useState('login')

    const handleloginSignupChange = (e) => {
        e.preventDefault();
        loginSignup === 'login' ? setLoginSignup('signup') : setLoginSignup('login');
    }

    return (
        <div>
            {loginSignup === 'login' ? 
                <LoginForm handleloginSignupChange={handleloginSignupChange} loginSignup={loginSignup} setLoginSignup={setLoginSignup} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> :
                <SignUpForm handleloginSignupChange={handleloginSignupChange} />
            }
        </div>
    )
}

function LoginForm({ handleloginSignupChange, loginSignup, setLoginSignup, loggedIn, setLoggedIn }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFail, setLoginFail] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('you need both an email and password to log in')
        } else {
            // now check against db
            axios
            .post('', {
                email: email,
                password: password
            })
            .then((res) => {
                setLoggedIn(true)
            })
            .catch((err) => {
                setLoginFail(true)
            })
            // then redirect to home page or display message
            // set login fail to true? and display message below?
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
                <input type="submit" />
                <button>checking { email } { password }</button>
            </form>
            <h4>need to sign up?</h4>
            <button onClick={handleloginSignupChange}>create an account</button>
            {loginFail === true ? <p>your credentials are not correct, try again</p> : <p></p>}
        </div> 
    )
}

function SignUpForm({ handleloginSignupChange }) {

    const [name, setName] = useState('');   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vtUsername, setVtUsername] = useState('');
    const [vtPassword, setVtPassword] = useState('');
    const [signedUp, setSignedUp] = useState('false');

    const [user, setUser] = useState('');
    const form = useRef(null);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        

        if (!vtUsername || !vtPassword) {
            alert('you need to provide all details to sign up')
        } else {
            let username = vtUsername.toString();
            let password = vtPassword.toString();
            console.log(`before sending ${username} ${password}`);
            axios
            .post('http://localhost:3000/new_user', {
                name: name,
                email: email,    
                vtUsername: username,
                vtPassword: password
            })
            .then((res) => {
                console.log(res)
                setSignedUp(true)

            })
            .catch((err) => {
                console.log(err)
            })
            // then redirect to login page or display message
        }
    }

    return (
        <div>
            <h1>create an account</h1>
            <form onSubmit={handleSubmit}>
            {/* <form> */}
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
                    VT_USERNAME:
                    <input 
                        type="text"
                        required
                        value={vtUsername}
                        onChange ={(e) => setVtUsername(e.target.value)}
                    />
                </label>
                <label>
                    VT_PASSWORD:
                    <input 
                        type="password"
                        required
                        value={vtPassword}
                        onChange ={(e) => setVtPassword(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
            
            
            {/* <h4>already have an account?</h4>
            <button onClick={handleloginSignupChange}>log into your account</button> */}
            
            {signedUp === 'true' ? 
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

