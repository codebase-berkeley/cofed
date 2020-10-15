import React from 'react';
import Cofedlogo from './CoFEDlogo.png';
import googlelogo from './GoogleLogo.png';
import './Login.css';

export default function Login() {
  const [emailInput, setEmailInput] = React.useState("");
  const [pwInput, setPwInput] = React.useState("");

  function handleSubmit() {
    console.log(emailInput, pwInput);
    setEmailInput("");
    setPwInput("");
  }

  return (
    <div className="Login">
      
      <div className="Logo">
      <a href = "https://www.cofed.coop/"> 
      {<img className = "photo" src = {Cofedlogo} alt = "cofed logo"/>}
      </a>
      </div>

      <div className="inputEmailBox">
        <div className="inputTitle">Email</div>
        <div><input
          type="text"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Enter email"
        /></div>
        
      </div>
      <div className="inputPwBox">
        <div className="inputTitle">Password</div>
        <div><input
          type="password"
          value={pwInput}
          onChange={(e) => setPwInput(e.target.value)}
          placeholder="Enter password"
        /></div>
      </div>
      <div className="buttons">
        <div className="loginButton"><button type="button" onClick={handleSubmit}>Login</button></div>
        <a href="#"><button type="button">Create Account</button></a> 
      </div>
      <div className = "orText">
        <br /> — OR — <br />
      </div>
      <div className = "googleButton"><a href="#"><button type="button"><img src={googlelogo}/>Login via Google</button></a> </div>
      <div className = "forgetPass"><a href="#" target="_blank">Forgot Password?</a></div>
    </div>
  );
}

