import './App.css';
import Login from './Login'
import Filters from './Filters';
import NavBar from './navbar'
import React from 'react';

export default function App() {
  const [mode, setMode] = React.useState(1);

  function render() {
    if (mode == 1) {
      return(<div>list please </div>)
    } else {
      return(<div>map please </div>)
    }
  }
 /*
  function display_button() {
    if (mode == 1) {
      return(
        <button className = "active_button" type="button" onClick={function (){setMode(1)}}>
        List</button>
        <button className = "inactive_button" type="button" onClick={function (){setMode(2)}}
        Map</button>
        )
    }
    else {
      return(
        <button className = "ianctive_button" type="button" onClick={function (){setMode(1)}}>
        List</button>) 
        <button className = "active_button" type="button" onClick={function (){setMode(2)}}>
        Map</button>) 
    }
  }
*/ 
  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="container">
        <div className="content">
          <div className="left-content">
          <div className="viewMode">
          <button className = "button" type="button" onClick={function (){setMode(1)}}>
            List
          </button>
          <button className = "button" type="button" onClick={function (){setMode(2)}}>
            Map
          </button>
        </div>
          <div>{render()}</div>
          <Filters
          title = "Race">
          </Filters>
          <Filters
          title = "Race"
          ></Filters>
          <Filters
          title = "Chain"
          ></Filters>
          <Filters
          title = "Products"
          ></Filters>
          <Filters
          title = "Co-op"
          ></Filters>
      </div>
          </div>
        
      <div className="content"></div>
       <div className="right-content">??</div>
      </div>
      
    </div>
  );
}
