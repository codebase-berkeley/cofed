import './FiltersPage.css';
import CoFEDlogo from './CoFEDlogo.png';
import CardComponent from './CardComponent';
import Filters from './Filters';
import React from 'react';
import './Filter.css';

export default function FiltersPage() {
  const [listOrMap, setListOrMap] = React.useState(true);

  function renderView() {
    if (listOrMap == true) {
      return (
        <div>
          <CardComponent
            profile={CoFEDlogo}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={CoFEDlogo}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={CoFEDlogo}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={CoFEDlogo}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={CoFEDlogo}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={CoFEDlogo}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={CoFEDlogo}
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

  function renderListButton() {
    const isActive = listOrMap == true ? 'active-button' : 'inactive-button';
    return (
      <button
        className={isActive}
        type="button"
        onClick={() => setListOrMap(true)}
      >
        List
      </button>
    );
  }

  function renderMapButton() {
    const isActive = listOrMap == false ? 'active-button' : 'inactive-button';
    return (
      <button
        className={isActive}
        type="button"
        onClick={() => setListOrMap(false)}
      >
        Map
      </button>
    );
  }

  const [location, setLocation] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [race, setRace] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [other, setOther] = React.useState([]);
  console.log({ role, location, race, products, other });

  function reset() {
    setRole([]);
    setLocation([]);
    setRace([]);
    setProducts([]);
    setOther([]);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="content">
          <div className="left-content">
            <div className="view-mode">
              {renderListButton()} {renderMapButton()}
            </div>
            <div className="filter-reset">
              <div className="filter-title">Filters</div>
              <button className="reset" type="button" onClick={reset}>
                Reset
              </button>
            </div>
            <div className="filter-container">
              <div className="filter-scroll">
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
            <div>{renderView()}</div>
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
