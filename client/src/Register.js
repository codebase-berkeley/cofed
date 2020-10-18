import React from 'react';
import './Register.css';
import search_icon from './assets/search.svg';

export default function Register() {
  const [nameInput, setNameInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');
  const [locationInput, setLocationInput] = React.useState('');

  function createAccount() {
    console.log(nameInput);
    console.log(passwordInput);
    console.log(emailInput);
    console.log(locationInput);
  }

  return (
    <div className="register">
      <p className="register_header">Register</p>
      <div className="textInputSet">
        <p className="inputType">Co-op Name</p>
        <input
          className="inputBox"
          type="text"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
      </div>
      <div className="textInputSet">
        <p className="inputType">Password</p>
        <input
          className="inputBox"
          type="password"
          value={passwordInput}
          onChange={e => setPasswordInput(e.target.value)}
        />
      </div>
      <div className="textInputSet">
        <p className="inputType">Email</p>
        <input
          className="inputBox"
          type="text"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
        />
      </div>
      <div className="textInputSet">
        <p className="inputType">Location</p>
        <input
          className="inputBox"
          type="text"
          value={locationInput}
          onChange={e => setLocationInput(e.target.value)}
        />
      </div>
      <p className="termsText">
        By creating an account, you agree to the{' '}
        <a>
          <b>Terms and Conditions</b>
        </a>
      </p>
      <button className="accountButton" type="button" onClick={createAccount}>
        Create Account
      </button>
    </div>
  );
}
