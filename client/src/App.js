import FiltersPage from './pages/FiltersPage/FiltersPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from './Context';
import React from 'react';
import './App.css';

function App() {
  const [user, setUser] = React.useState();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={FiltersPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
