import FiltersPage from './pages/FiltersPage/FiltersPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import Profile from './components/Profile/Profile';
import tina from './assets/tina.png';
import './App.css';

function App() {
  const coop = {
    name: "Richard's Radishes",
    location: 'Berkeley, CA',
    email: 'RichardRadishes@gmail.com',
    website: 'RichardRadishes.com',
    phone: '303-866-1349',
    instaLink: 'http://instagram.com',
    fbLink: 'http://facebook.com',
    description: 'lorem upsum',
    missionText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tags: ['organic', 'black-owned'],
    facebook: 'https://facebook.com',
    profilePicture: tina,
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FiltersPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route
          exact
          path="/profilepage"
          component={() => (
            <Profile coop={coop} allowEdit={true} allowView={false} />
          )}
        />
        <Route exact path="/profile" component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
