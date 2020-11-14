import CofedLogo from '../../assets/CoFEDlogo.png';
import GoogleLogo from '../../assets/GoogleLogo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';

export default function LoginPage() {
  const [emailInput, setEmailInput] = React.useState('');
  const [pwInput, setPwInput] = React.useState('');
  let [loginSwitch, setLoginSwitch] = React.useState('/login');

  function handleSubmit() {
    console.log(emailInput, pwInput);
    checkLogin();
    setEmailInput('');
    setPwInput('');
  }

  async function checkLogin() {
    // const coopId = await axios.get('/api/authen', {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods':
    //       'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    //   },
    //   password: pwInput,
    //   email: emailInput,
    // });

    // console.log('coopId: ' + coopId);

    const res = await axios.post('/api/authen', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      },
      email: emailInput,
      pass: pwInput,
    });
    console.log(res.data);
    //if there is no input, res.data = '' = false
    if (res.data) {
      setLoginSwitch('/');
    }
    //if statement that changes the value of loginSwitch if necessary
    // <Link to="/"></Link>;
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
          <button
            className="loginPageButton"
            type="button"
            // onClick={handleSubmit}
          >
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
