import './FiltersPage.css';
import './ReactToggle.css';
import axios from 'axios';
import { UserContext } from '../../Context';

import Card from '../../components/Card/Card';
import Filters from '../../components/Filter/Filter';
import NavBar from '../../components/Navbar/Navbar';
import React from 'react';
import Profile from '../../components/Profile/Profile';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Toggle from 'react-toggle';

export default function FiltersPage() {
  const { setUser } = React.useContext(UserContext);
  const [listMode, setListMode] = React.useState(true);
  const [sortType, setSortType] = React.useState([
    {
      value: 'alphabetical',
      label: 'sort: alphabetical',
    },
  ]);
  const [location, setLocation] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [race, setRace] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [other, setOther] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [showStarredOnly, setShowStarredOnly] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState(null);

  function mapTilerProvider(x, y, z, dpr) {
    return `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  }

  const [coops, setCoops] = React.useState([]);
  const [starredCoops, setStarredCoops] = React.useState([]);
  const [coopShown, setCoopShown] = React.useState([]);
  const [dropDownOptions, setDropDownOptions] = React.useState([]);
  const [arrayOfFiltersInfo, setArrayOfFiltersInfo] = React.useState([]);

  async function fetchAllCoops() {
    const res = await axios.get('/api/coops');
    setCoops(res.data);
  }

  async function fetchInitialData() {
    // try {
    // //   const res = await axios.get('/api/coops');
    // //   setCoops(res.data);
    // //   if (res.data.length !== 0) {
    // //     setCoopShown(res.data[0]);
    // //   }
    // // } catch (err) {
    // //   setUser(null);
    // // }

    // //get the toggle star info
    // const starred = await axios.get('/api/getStarred');
    // //set the query data as the starred coops
    // let starredIds = starred.data.map(e => {
    //   return e.starred_coop_id;
    // });
    // setStarredCoops(starredIds);

    //get the tags to put in the filters dropdown
    //tags.data = 0: [{categories: "(1,Role)", array_agg: "{"(1,Cooperative,1)","(2,Distributor,1)","(3,Producer,1)"]
    const tags = await axios.get('/api/tags');
    const modTag = tags.data.map(getCategoryInfo);
    console.log(modTag);
    // console.log(modTag);
    // setArrayOfFiltersInfo(d);
    setDropDownOptions(tags.data);
    setArrayOfFiltersInfo(modTag);
  }

  function getCategoryInfo(categoryWithTags) {
    const categoryName = categoryWithTags['categories']
      .replace(')', '')
      .replace('(', '')
      .split(',')[1];

    const ArrTagData = categoryWithTags['array_agg']
      // .replace(')', '')
      // .replace('(', '')
      .split('"');

    console.log(ArrTagData);
    var options = [];

    for (let index in ArrTagData) {
      const tagData = ArrTagData[index];
      if (tagData.length > 2) {
        const splitTagData = tagData.split(',');
        const id = parseInt(splitTagData[0].replace('(', ''));
        const name = splitTagData[1];
        console.log(id + '   ' + name);

        options.push(makeCategoryOptions(id, name));
      }
    }

    function makeCategoryOptions(id, name) {
      const dict = {
        value: name,
        label: name,
        id: id,
      };
      return dict;
    }

    // const options = [
    //   { value: 'alphabetical', label: 'sort: alphabetical' },
    //   { value: 'distance', label: 'sort: distance' },
    // ];

    const x = [categoryName, options];

    return x;
  }

  React.useEffect(() => {
    fetchInitialData();
  }, []);

  if (!coops) {
    return <div>Loading...</div>;
  }

  function findSortType() {
    if (sortType['value'] === 'alphabetical') {
      return sortAlphabetically;
    } else if (sortType['value'] === 'distance') {
      return sortAlphabetically; // replace with 'sortLocation' once location option is configured
    }
  }

  function sortAlphabetically(coop1, coop2) {
    return coop1['coop_name'] > coop2['coop_name'] ? 1 : -1;
  }

  function searchCoops(coop) {
    if (searchInput === null) return true;
    else {
      for (let k in coop) {
        if (
          typeof coop[k] === 'string' &&
          coop[k].toLowerCase().includes(searchInput.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    }
  }

  function toggleStar(starredId) {
    if (starredCoops.includes(starredId)) {
      //if the coop is already starred remove the coop from the list of starred
      const tempStarredCoops = [...starredCoops];
      const index = starredCoops.indexOf(starredId);
      if (index > -1) {
        tempStarredCoops.splice(index, 1);
      }
      setStarredCoops(tempStarredCoops);
      axios.delete('/api/delete', {
        data: {
          starredId,
        },
      });
    } else {
      //add the coop from the list of starred if the coop isn't starred yet
      const tempStarredCoops = [...starredCoops, starredId];
      setStarredCoops(tempStarredCoops);
      axios.post('/api/addStar', {
        starredId,
      });
    }
  }

  function renderListView() {
    if (showStarredOnly) {
      return (
        <div className="list-mode">
          {coops
            .sort(findSortType())
            .filter(searchCoops)
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
          {coops
            .sort(findSortType())
            .filter(searchCoops)
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
              .filter(searchCoops)
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
            {coops.filter(searchCoops).map((coop, index) => (
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
      return [39.8283, -98.5795]; // this is the center of the US
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
    fetchAllCoops();
  }

  function makeDictionary(tag) {
    const dict = {
      value: tag.tag_name,
      label: tag.tag_name,
      id: tag.id,
    };
    return dict;
  }

  //THING TO HOLD THE DATA
  //An array of dictionarys where reach dictionary has a name and a arrayOfOptions
  //                NameAndOptionsArray
  // [{name: roleOptions, arrayOfOptions:valueLabelDicts}
  //   name: raceOptions, arrayOfOptions:valueLabelDicts}]

  //tags.data = 0: [{categories: "(1,Role)", array_agg: "{"(1,Cooperative,1)","(2,Distributor,1)","(3,Producer,1)"]

  //tags.data.map(turnToFilter)

  /* for dict in tags.data {

      for(let category_id in dict) {
        arrayOfTagIds = dict[category_id]
        arrayOfTagIds.map(makeDictionary) --> but each "tag" needs to be a dictionary with a name and id, NOT JUST A NUMBER
        
        var d = {name: category_id
                arrayOfOptions: arrayOfTagsIds}

        NameAndOptionsArray.append(d);


  // do something with "key" and "value" variables
}
  }

  */

  /**roleOptions = [
    {value: 1, label: 1},
    {value: 2, label: 2}.
    {value: 3, label: 3}.
    {value: 4, label: 4}.
    {value: 5, label: 5}.
]
  raceOptions = [
    {value: 6, label: 6},
    {value: 7, label: 7}.
    {value: 8, label: 8}.
]
**/

  /**
 *    <Filters
          isMulti={true}
          title="role"
          options={roleOptions}
          values={role}
          onChange={handleChange(setRole)}
        />

      <Filters
          isMulti={true}
          title="role"
          options={raceOptions}
          values={role}
          onChange={handleChange(setRole)}
        />
 */

  function DropDownOptionsToRoleOptions() {}

  const roleOptions = dropDownOptions.map(tag => makeDictionary(tag));

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
  const sortOptions = [
    { value: 'alphabetical', label: 'sort: alphabetical' },
    { value: 'distance', label: 'sort: distance' },
  ];

  function handleStarToggle() {
    setSelectedIndex(null);
    showStarredOnly ? setShowStarredOnly(false) : setShowStarredOnly(true);
  }

  function handleChange(setter) {
    async function onChange(event) {
      setSelectedIndex(null);
      setter(event);
      if (event === null || event.length === 0) {
        fetchAllCoops();
      } else {
        const params = {
          tags: event.map(newArray => newArray.id),
        };

        const res = await axios.get('/api/filteredCoops', {
          params,
        });

        setCoops(res.data);
      }
    }

    return onChange;
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
                <input
                  type="text"
                  className="coops-search-bar"
                  placeholder="Search..."
                  onChange={e => setSearchInput(e.target.value)}
                />
                <Filters
                  options={sortOptions}
                  onChange={setSortType}
                  defaultValue={[
                    {
                      value: 'alphabetical',
                      label: 'alphabetical',
                    },
                  ]}
                />
                {arrayOfFiltersInfo &&
                  arrayOfFiltersInfo.map(categoryInfo => (
                    <Filters
                      isMulti={true}
                      title={categoryInfo[0]}
                      options={categoryInfo[1]}
                      values={role}
                      onChange={handleChange(setRole)}
                      key={categoryInfo}
                    />
                  ))}
                {/*
                <Filters
                  isMulti={true}
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
                  isMulti={true}
                />
                <Filters
                  title="race"
                  options={raceOptions}
                  values={race}
                  onChange={setRace}
                  isMulti={true}
                />
                <Filters
                  title="products"
                  options={productOptions}
                  values={products}
                  onChange={setProducts}
                  isMulti={true}
                />
                <Filters
                  title="other"
                  options={otherOptions}
                  values={other}
                  onChange={setOther}
                  isMulti={true}
                /> */}
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
