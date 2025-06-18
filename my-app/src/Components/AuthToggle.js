import React, { useState } from "react";
import LoginForm from "./Login";
import SignupForm from "./SignUp"
import './Login.css'

function AuthToggle() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div id="main">
            <div id="middle">
                <div id="middlebox">
                    <div id="login">
                        {isLogin ? <LoginForm /> : <SignupForm />}
                        <button id="swapbutton" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthToggle