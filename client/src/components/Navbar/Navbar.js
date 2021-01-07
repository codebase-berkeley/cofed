import React from 'react';
import logo from '../../assets/CoFEDlogo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';
import axios from 'axios';
import { UserContext } from '../../Context';

export default function NavBar(props) {
  const { setUser } = React.useContext(UserContext);

  async function logout() {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  }

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
