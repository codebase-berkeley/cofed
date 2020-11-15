import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterPage.css';
import axios from 'axios';

export default function RegisterPage() {
  const [nameInput, setNameInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');
  const [locationInput, setLocationInput] = React.useState('');

  async function createAccount() {
    await axios.post('/api/coop', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      },
      email: emailInput,
      name: nameInput,
      addr: locationInput,
      pass: passwordInput,
    });
  }

  return (
    <div className="register">
      <p className="register-header">Register</p>
      <div className="text-input-set">
        <p className="inputType">Co-op Name</p>
        <input
          className="register-input-box"
          type="text"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
        />
      </div>
      <div className="text-input-set">
        <p className="inputType">Password</p>
        <input
          className="register-input-box"
          type="password"
          value={passwordInput}
          onChange={e => setPasswordInput(e.target.value)}
        />
      </div>
      <div className="text-input-set">
        <p className="inputType">Email</p>
        <input
          className="register-input-box"
          type="text"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
        />
      </div>
      <div className="text-input-set">
        <p className="inputType">Location</p>
        <input
          className="register-input-box"
          type="text"
          value={locationInput}
          onChange={e => setLocationInput(e.target.value)}
        />
      </div>
      <p className="terms-text">
        By creating an account, you agree to the{' '}
        <a>
          <span className="terms-and-cond">Terms and Conditions</span>
        </a>
      </p>
      <Link to="/createprofile">
        <button className="accountButton" type="button" onClick={createAccount}>
          Create Account
        </button>
      </Link>
    </div>
  );
}
