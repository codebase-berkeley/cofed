import './FiltersPage.css';
import tina from './assets/tina.png';
import CardComponent from './CardComponent';
import Filters from './Filters';
import NavBar from './navbar';
import React from 'react';
import Profile from './Profile';
import './Filter.css';

export default function FiltersPage() {
  const [listOrMap, setListOrMap] = React.useState(true);

  function renderView() {
    if (listOrMap == true) {
      return (
        <div>
          <CardComponent
            profile={tina}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={tina}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={tina}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={tina}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={tina}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={tina}
            name="Bianca's Radishes"
            location="Berkeley, CA"
            tags={['vegetables', 'fruit']}
          />
          <CardComponent
            profile={tina}
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
    <div className="FiltersPage">
      <NavBar username="Rad Radishes" />
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
            <Profile
              name="Richard's Radishes"
              location="Berkeley, CA"
              email="RichardRadishes@gmail.com"
              website="RichardRadishes.com"
              phone="303-866-1349"
              instaLink="instagram.com"
              fbLink="facebook.com"
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
          </div>
        </div>
      </div>
    </div>
  );
}
