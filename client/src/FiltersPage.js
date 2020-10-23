import './App.css';
import Login from './Login';
import CardComponent from './CardComponent';
import Filters from './Filters';
import NavBar from './navbar';
import React from 'react';
import './Filter.css';

export default function FiltersPage() {
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  // Map and List view mode buttons

  const [mode, setMode] = React.useState(1);

  function render() {
    if (mode == 1) {
      return (
        <div>
          <CardComponent
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
        </div>
      );
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

  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  // Filter Dropdowns

  const [role, setRole] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [race, setRace] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [other, setOther] = React.useState([]);
  console.log(role, location, race, products, other);

  function reset() {
    setRole([]);
    setLocation([]);
    setRace([]);
    setProducts([]);
    setOther([]);
  }
  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <div className="container">
        <div className="content">
          <div className="left-content">
            <div className="viewMode">
              {list_button()} {map_button()}
            </div>
            <div className="filterReset">
              <h3 className="filter-title">Filters</h3>
              <button
                className="reset"
                style={{ marginTop: '14px' }}
                type="button"
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>
            <div className="filterContainer">
              <div className="filterScroll">
                <Filters title="role" values={role} onChange={setRole} />
                <Filters
                  title="location"
                  values={location}
                  onChange={setLocation}
                />
                <Filters title="race" values={race} onChange={setRace} />
                <Filters
                  title="products"
                  values={products}
                  onChange={setProducts}
                />
                <Filters title="other" values={other} onChange={setOther} />
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="centre-content">
            <div>{render()}</div>
          </div>
        </div>
        <div className="content">
          <div className="right-content">
            <div>profile here</div>
          </div>
        </div>
      </div>
    </div>
  );
}
