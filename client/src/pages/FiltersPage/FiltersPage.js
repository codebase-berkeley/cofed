import './FiltersPage.css';
import './ReactToggle.css';
import axios from 'axios';

import Card from '../../components/Card/Card';
import Filters from '../../components/Filter/Filter';
import NavBar from '../../components/Navbar/Navbar';
import React from 'react';
import Profile from '../../components/Profile/Profile';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Toggle from 'react-toggle';

export default function FiltersPage() {
  const [listMode, setListMode] = React.useState(true);
  const [location, setLocation] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [race, setRace] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [other, setOther] = React.useState([]);
  // const [coop, setCoop] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function mapTilerProvider(x, y, z, dpr) {
    return `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  }

  const [coops, setCoops] = React.useState([]); //all coops
  //tracker for the starred coops, an array of starred coops
  const [starredCoops, setStarredCoops] = React.useState([]);
  const [coopShown, setCoopShown] = React.useState([]);

  async function fetchData() {
    const res = await axios.get('/api/coops');
    setCoops(res.data, () => {
      setCoopShown(coops[0]);
    });

    //get the toggle star info
    const starred = await axios.get('/api/getStarred', {
      params: {
        starrerId: 1,
      },
    }); 
    //set the query data as the starred coops
    setStarredCoops(starred.data);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!coops) {
    return <div>Loading...</div>;
  }

  function toggleStar(starredId, starrerId, coop) {
    if (starredCoops.includes(starredId)) {
      //if the coop is already starred
      //remove the coop from the list of starred
      /*** CHECK??? ***/
      const index = starredCoops.indexOf(coop.id);
      if (index > -1) {
        starredCoops.splice(index, 1);
      }
      //remove the row from the database
      axios.delete('/delete', {
        data: {
          starred_id: starredId,
          starrer_id: starrerId,
        },
      });
    } else {
      //if the coop isn't starred yet
      //add the coop from the list of starred
      starredCoops.push(coop);
      //make a post request
      axios.post('/addStar', {
        data: {
          starred_id: starredId,
          starrer_id: starrerId,
        },
      });
    }
  }

  function renderListView() {
    return (
      <div className="list-mode">
        {coops.map((coop, index) => (
          <Card
            key={index}
            profile={coop.profile_pic}
            name={coop.coop_name}
            location={coop.addr}
            tags={coop.tags}
            starred={starredCoops.includes(coop.id)}
            selected={selectedIndex === index}
            onClick={() => renderProfile(coop, index)}
          />
        ))}
      </div>
    );
  }

  function renderMapView() {
    return (
      <div className="map-mode">
        <Map
          center={[coops[0].latitude, coops[0].longitude]}
          zoom={6}
          twoFingerDrag={true}
          provider={mapTilerProvider}
        >
          {coops.map((coop, index) => (
            <Marker
              payload={index}
              key={index}
              anchor={[coop.latitude, coop.longitude]}
              onClick={() => renderProfile(coop, index)}
            />
          ))}
        </Map>
      </div>
    );
  }

  function renderListButton() {
    const isActive = listMode ? 'active-button' : 'inactive-button';
    return (
      <button
        className={isActive}
        type="button"
        onClick={() => setListMode(true)}
      >
        List
      </button>
    );
  }

  function renderMapButton() {
    const isActive = listMode ? 'inactive-button' : 'active-button';
    return (
      <button
        className={isActive}
        type="button"
        onClick={() => setListMode(false)}
      >
        Map
      </button>
    );
  }

  function renderProfile(coop, index) {
    setCoopShown(coop);
    setSelectedIndex(index);
  }

  function reset() {
    setRole([]);
    setLocation([]);
    setRace([]);
    setProducts([]);
    setOther([]);
  }

  const roleOptions = [
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'producer', label: 'Producer' },
  ];
  const locationOptions = [
    { value: 'Alabama', label: 'Alabama' },
    { value: 'Alaska', label: 'Alaska' },
    { value: 'Arizona', label: 'Arizona' },
    { value: 'Arkansas', label: 'Arkansas' },
    { value: 'California', label: 'California' },
    { value: 'Colorado', label: 'Colorado' },
    { value: 'Connecticut', label: 'Connecticut' },
    { value: 'Delaware', label: 'Delaware' },
    { value: 'District of Columbia', label: 'District of Columbia' },
    { value: 'Florida', label: 'Florida' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Hawaii', label: 'Hawaii' },
    { value: 'Idaho', label: 'Idaho' },
  ];
  const raceOptions = [
    { value: 'black', label: 'Black-owned' },
    { value: 'native', label: 'Native-owned' },
    { value: 'asian', label: 'Asian-owned' },
    { value: 'pacificIslander', label: 'Pacific Islander-owned' },
    { value: 'hispanicOrLatinx', label: 'Hispanic or Latinx-owned' },
  ];
  const productOptions = [
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'natural', label: 'Natural Goods' },
    { value: 'wholefoods', label: 'Wholefoods' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'brew', label: 'Brew' },
    { value: 'fish', label: 'Fish' },
    { value: 'meats', label: 'Meats' },
  ];
  const otherOptions = [
    { value: 'nonGMO', label: 'Verified Non-GMO' },
    { value: 'startup', label: 'Startup' },
    { value: 'queer', label: 'Queer-owned' },
    { value: 'nonprofit', label: 'Non-profit' },
  ];

  function handleToggle() {}

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
            <label className="filter-toggle-div">
              <p className="starred-only-text">Show starred only</p>
              <Toggle
                className="filter-toggle"
                defaultChecked={false}
                icons={false}
                onChange={handleToggle}
              />
            </label>
            <div className="filter-container">
              <div className="filter-scroll">
                <Filters
                  title="role"
                  options={roleOptions}
                  values={role}
                  onChange={setRole}
                />
                <Filters
                  title="location"
                  options={locationOptions}
                  values={location}
                  onChange={setLocation}
                />
                <Filters
                  title="race"
                  options={raceOptions}
                  values={race}
                  onChange={setRace}
                />
                <Filters
                  title="products"
                  options={productOptions}
                  values={products}
                  onChange={setProducts}
                />
                <Filters
                  title="other"
                  options={otherOptions}
                  values={other}
                  onChange={setOther}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="centre-content">
            {listMode ? renderListView() : renderMapView()}
          </div>
        </div>
        <div className="content">
          <div className="right-content">
            {coopShown && (
              <Profile
                allowView={true}
                allowEdit={false}
                coop={coopShown}
                starred={starredCoops.includes(coopShown.id)}
                handleStar={toggleStar}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
