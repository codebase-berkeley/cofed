import './App.css';
import Login from './Login';
import React from 'react';
import Profile from './Profile';

function App() {
  return <Profile
  name="Richard's Co-op"
  location="Berkeley, CA"
  email="richTheBest@gmail.com"
  emailLink="https://google.com"
  website="theBestWebsite.com"
  websiteLink="https://google.com"
  phone="303-866-1349"

  //profilePic= "www.html.am/images/samples/remarkables_queenstown_new_zealand-300x225.jpg"
  tags={["Montserrat", "Run" ,"I", "Really", "Like", "Chicken", "Legs"]}/>;
}

export default App;
