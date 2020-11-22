import React from 'react';
import logo from '../../assets/CoFEDlogo.png';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';
import axios from 'axios';

export default function NavBar(props) {
  const [redirect, setRedirect] = React.useState(false);

  async function logout() {
    console.log('WITHIN LOGOUT');
    try {
      await axios.post('/auth/logout');
      console.log('LOGGING OUT');
      setRedirect(true);
      console.log('LOGGED OUT');
    } catch (err) {
      console.log('CAUGHT ERROR');
      console.log(err.stack);
      setRedirect(false);
    }
  }

  if (redirect) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="navbar">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="cofed logo" />
        </Link>
        <div className="navbar-rightside">
          <Link to="/">
            <button className="nav-button">Home</button>
          </Link>
          <Link to="/profile" className="navbar-link-to-profile">
            <button className="nav-button">My Profile</button>
          </Link>
          <Link to="/login">
            <button className="nav-button" type="button" onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  username: PropTypes.string,
};
