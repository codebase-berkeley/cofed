import FiltersPage from './pages/FiltersPage/FiltersPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FiltersPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/profile" component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
