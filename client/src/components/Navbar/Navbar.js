import React from 'react';
import logo from '../../assets/CoFEDlogo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

function logout() {
  console.log('Logged Out');
}

export default function NavBar(props) {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="navbar-logo" src={logo} alt="cofed logo" />
      </Link>
      <div className="navbar-rightside">
        <p className="navbar-hello">
          Hello,{' '}
          <Link to="/profile" className="navbar-link-to-profile">
            <b>{props.username}</b>
          </Link>
        </p>
        <Link to="/login">
          <button
            className="navbar-logout-button"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  username: PropTypes.string,
};
