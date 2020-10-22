import React from 'react';
import './navbar.css';
import logo from './CoFEDlogo.png';

function logout() {
  console.log('Logged Out');
}

export default function NavBar() {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="cofed logo" />
      <div className="rightside">
        <p className="hello">
          Hello,{' '}
          <a>
            <b>Rad Radishes</b>
          </a>
        </p>
        <button className="logoutButton" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
