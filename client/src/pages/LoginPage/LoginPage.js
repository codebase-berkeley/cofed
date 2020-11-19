import CofedLogo from '../../assets/CoFEDlogo.png';
import GoogleLogo from '../../assets/GoogleLogo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
export default function LoginPage() {
  const [emailInput, setEmailInput] = React.useState('');
  const [pwInput, setPwInput] = React.useState('');

  function handleSubmit() {
    verify();
    setEmailInput('');
    setPwInput('');
  }

  async function verify() {
    await axios.post('/api/login', {
      data: {
        email: emailInput,
        pass: pwInput,
      },
    });
  }

  return (
    <div className="Login">
      <div className="Logo">
        <a href="https://www.cofed.coop/">
          <img className="photo" src={CofedLogo} alt="cofed logo" />
        </a>
      </div>

      <div className="inputEmailBox">
        <div className="inputTitle">Email</div>
        <div>
          <input
            type="text"
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
            placeholder="Enter email"
          />
        </div>
      </div>
      <div className="inputPwBox">
        <div className="inputTitle">Password</div>
        <div>
          <input
            type="password"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            placeholder="Enter password"
          />
        </div>
      </div>
      <div className="loginButtons">
        <div className="login">
          <Link to="/">
            <button
              className="loginPageButton"
              type="button"
              onClick={handleSubmit}
            >
              Login
            </button>
          </Link>
        </div>
        <Link to="/register">
          <button className="loginPageButton" type="button">
            Create Account
          </button>
        </Link>
      </div>
      <div className="orText">
        <br /> — OR — <br />
      </div>
      <div className="googleButton">
        <a href="#">
          <button className="loginPageButton" type="button">
            <img src={GoogleLogo} />
            Login via Google
          </button>
        </a>{' '}
      </div>
      <div className="forgetPass">
        <a href="#" target="_blank">
          Forgot Password?
        </a>
      </div>
    </div>
  );
}
