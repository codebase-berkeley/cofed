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
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [showStarredOnly, setShowStarredOnly] = React.useState(false);

  function mapTilerProvider(x, y, z, dpr) {
    return `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  }

  const [coops, setCoops] = React.useState([]); //all coops
  //tracker for the starred coops, an array of starred coops
  const [starredCoops, setStarredCoops] = React.useState([]);
  const [coopShown, setCoopShown] = React.useState([]);
  const [dropDownOptions, setDropDownOptions] = React.useState([]);

  async function fetchInitialData() {
    const res = await axios.get('/api/coops');
    setCoops(res.data);
    setCoopShown(res.data[0]);

    //get the toggle star info
    const starred = await axios.get('/api/getStarred/1');
    //set the query data as the starred coops
    let starredIds = starred.data.map(e => {
      return e.starred_coop_id;
    });
    setStarredCoops(starredIds);

    //get the tags to put in the filters dropdown
    const tags = await axios.get('/api/tags');
    setDropDownOptions(tags.data);
  }

  React.useEffect(() => {
    fetchInitialData();
  }, []);

  if (!coops) {
    return <div>Loading...</div>;
  }

  function toggleStar(starredId, starrerId) {
    if (starredCoops.includes(starredId)) {
      //if the coop is already starred
      //remove the coop from the list of starred
      const tempStarredCoops = [...starredCoops];
      const index = starredCoops.indexOf(starredId);
      if (index > -1) {
        tempStarredCoops.splice(index, 1);
      }
      setStarredCoops(tempStarredCoops);
      //remove the row from the database
      axios.delete('/api/delete', {
        data: {
          starredId,
          starrerId,
        },
      });
    } else {
      //if the coop isn't starred yet
      //add the coop from the list of starred
      const tempStarredCoops = [...starredCoops, starredId];
      setStarredCoops(tempStarredCoops);
      //make a post request
      axios.post('/api/addStar', {
        starredId,
        starrerId,
      });
    }
  }

  function renderListView() {
    if (showStarredOnly) {
      return (
        <div className="list-mode">
          {coops
            .filter(coop => starredCoops.includes(coop.id))
            .map((coop, index) => (
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
    } else {
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
  }

  function renderMapView() {
    if (showStarredOnly) {
      return (
        <div className="map-mode">
          <Map
            center={findMapCenter(coops)}
            zoom={6}
            twoFingerDrag={true}
            provider={mapTilerProvider}
          >
            {coops
              .filter(coop => starredCoops.includes(coop.id))
              .map((coop, index) => (
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
    } else {
      return (
        <div className="map-mode">
          <Map
            center={findMapCenter(coops)}
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
  }

  function findMapCenter(coops) {
    if (coops.length > 0) {
      return [coops[0].latitude, coops[0].longitude];
    } else {
      return [39.8283, -98.5795];
    }
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

  /* var listOfTags = [{'tag 1'}, {'tag 2'}, {'tag 3'}]; */

  function makeDictionary(tag) {
    var dict = {
      value: tag.tag_name,
      label: tag.tag_name,
      id: tag.id,
    };
    return dict;
  }

  const roleOptions = dropDownOptions.map(tag => makeDictionary(tag));

  /* const roleOptions = [
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'producer', label: 'Producer' },
  ]; */

  // const target = [
  //   { value: 'tag 1', label: 'tag 1' },
  //   { value: 'tag 2', label: 'tag 2' },
  //   { value: 'tag 3', label: 'tag 3' },
  // ];

  const locationOptions = [
    { value: '2378648', label: 'Alabama' },
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

  function handleStarToggle() {
    showStarredOnly ? setShowStarredOnly(false) : setShowStarredOnly(true);
  }

  function handleChange(setter) {
    async function helper(x) {
      //set the value using the setter
      setter(x);

      console.log(x);
      if (x == null || x.length == 0) {
        //query for everything
        const res = await axios.get('/api/coops');
        setCoops(res.data);
      } else {
        const params = {
          tags: x.map(newArray => newArray.id),
        };

        const res = await axios.get('/api/filteredCoops', {
          params,
        });
        setCoops(res.data);
      }
    }

    return helper;
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
            <label className="filter-toggle-div">
              <p className="starred-only-text">Show starred only</p>
              <Toggle
                className="filter-toggle"
                defaultChecked={false}
                icons={false}
                onChange={handleStarToggle}
              />
            </label>
            <div className="filter-container">
              <div className="filter-scroll">
                <Filters
                  title="role"
                  options={roleOptions}
                  values={role}
                  onChange={handleChange(setRole)}
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
            {coops && (
              <Profile
                allowView={true}
                allowEdit={false}
                coop={coopShown}
                starred={starredCoops.includes(coopShown.id)}
                handleStar={toggleStar}
                starrerId={1}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
