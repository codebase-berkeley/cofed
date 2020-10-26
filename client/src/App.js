import './App.css';
import FiltersPage from './pages/FiltersPage/FiltersPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FiltersPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route
          exact
          path="/profile"
          component={() => (
            <ProfilePage
              name="Richard's Radishes"
              location="Berkeley, CA"
              email="RichardRadishes@gmail.com"
              website="RichardRadishes.com"
              phone="303-866-1349"
              instaLink="http://instagram.com"
              fbLink="http://facebook.com"
              missionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              descText="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
              tags={[
                'Organic',
                'Non-GMO',
                'Farming',
                'LGBTQ',
                'Marketplace',
                'Radishes',
                'Vegetables',
              ]}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
