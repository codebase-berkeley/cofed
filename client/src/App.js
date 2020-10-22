import './App.css';
import Login from './Login';
import Filters from './Filters';
import NavBar from './navbar';
import React from 'react';
import { forwardRef, useRef, useImperativeHandle } from 'react';

export default function App() {
  const [mode, setMode] = React.useState(1);
  const childRef = useRef();

  function render() {
    if (mode == 1) {
      return <div>list please</div>;
    } else {
      return <div>map please </div>;
    }
  }

  function list_button() {
    if (mode == 1) {
      return (
        <button
          className="activeButton"
          type="button"
          onClick={() => setMode(1)}
        >
          List
        </button>
      );
    } else {
      return (
        <button
          className="inactiveButton"
          type="button"
          onClick={() => setMode(1)}
        >
          List
        </button>
      );
    }
  }

  function map_button() {
    if (mode == 2) {
      return (
        <button
          className="activeButton"
          type="button"
          onClick={() => setMode(2)}
        >
          Map
        </button>
      );
    } else {
      return (
        <button
          className="inactiveButton"
          type="button"
          onClick={() => setMode(2)}
        >
          Map
        </button>
      );
    }
  }

  function reset() {
    console.log('reset');
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="container">
        <div className="content">
          <div className="left-content">
            <div className="viewMode">
              {list_button()} {map_button()}
            </div>
            <div className="filterReset">
              <h3 className="filter-title">Filters</h3>
              <button className="reset" type="button" onClick={() => reset()}>
                Reset
              </button>
            </div>
            <div classname="filterContainer">
              <Filters></Filters>
              <Filters></Filters>
              <Filters></Filters>
              <Filters></Filters>
              <Filters></Filters>
            </div>
          </div>
        </div>

        <div className="content"></div>
        <div className="right-content">
          <div>{render()}</div>
        </div>
      </div>
    </div>
  );
}
