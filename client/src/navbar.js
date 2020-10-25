import React from 'react';
import './navbar.css';
import logo from './CoFEDlogo.png';
import PropTypes from 'prop-types';

function logout() {
  console.log('Logged Out');
}

export default function NavBar(props) {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="cofed logo" />
      <div className="rightside">
        <p className="hello">
          Hello,{' '}
          <a href="#" target="_blank">
            <b>{props.username}</b>
          </a>
        </p>
        <button className="logoutButton" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  username: PropTypes.string,
};
