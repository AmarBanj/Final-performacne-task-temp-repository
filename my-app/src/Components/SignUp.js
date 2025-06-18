import React, { useState } from "react";
import './Login.css'

function SignupForm() {
  const [Uname, setUname] = useState('');
  const [Pword, setPword] = useState('');
  const [Email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/save-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Uname, Pword, Email }),
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.error || "Something went wrong :T ");
    }
    else {
      alert("User signed up successfully!")
    }
  };

  return (
    <div>
      <div class="logintext">Sign up</div>
      <form onSubmit={handleSubmit}>
        <div id="normaltext">Email</div>
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div id="normaltext">Username</div>
        <input
          type="text"
          placeholder="Username"
          value={Uname}
          onChange={(e) => setUname(e.target.value)}
          required
        />
        <div id="normaltext">Password</div>
        <input
          type="password"
          placeholder="Password"
          value={Pword}
          onChange={(e) => setPword(e.target.value)}
          required
        />
        <button id="button" type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignupForm;