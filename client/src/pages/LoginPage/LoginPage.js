import CofedLogo from '../../assets/CoFEDlogo.png';
import GoogleLogo from '../../assets/GoogleLogo.png';
import React from 'react';
import PropTypes from 'prop-types';
import './LoginPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context';

export default function LoginPage(props) {
  const [emailInput, setEmailInput] = React.useState('');
  const [pwInput, setPwInput] = React.useState('');
  const { setUser } = React.useContext(UserContext);
  const googleAuthLink =
    process.env.NODE_ENV === 'production'
      ? '/auth/google'
      : 'http://localhost:8000/auth/google';

  function handleSubmit() {
    verify();
    setEmailInput('');
    setPwInput('');
  }

  async function verify() {
    try {
      await axios.post('/auth/login', {
        username: emailInput,
        password: pwInput,
      });
      const res = await axios.get('/api/coop');
      setUser(res.data);
    } catch (err) {
      alert('Invalid username or password');
    }
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
          <button
            className="loginPageButton"
            type="button"
            onClick={handleSubmit}
          >
            Login
          </button>
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
        <a href={googleAuthLink} target="blank">
          <button className="loginPageButton" type="button">
            <img src={GoogleLogo} />
            Login via Google
          </button>
        </a>{' '}
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  location: PropTypes.object,
};
