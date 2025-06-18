import React, { useState } from "react";
import './Login.css';

function LoginForm() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Found user! ' + data.message);
        }
        else {
            setMessage('User doesnt exist: ' + data.message);
        }
            
    };


    return (
        <div>
        <div class="logintext">Login</div>
        <form onSubmit={handleLogin}>
            <div id="normaltext">Email or Username</div>
            <input
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
            />
            <div id="normaltext">Password</div>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button id="button" type="submit">Login</button>
            <div id="infotext">Input your account details into the field above! If you havent created an account press the button below. The program will check the CSV file for a matching email or username, and then the password. Do note emails and usernames are case sensitive. All accounts are saved so even when the site is closed, the account still exists!</div>
            {message && <p>{message}</p>}
        </form>
        </div>
    );
}
export default LoginForm;