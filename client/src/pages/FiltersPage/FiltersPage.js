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
import { initializeCategoryOptions } from '../../tagCategoryHelper';

export default function FiltersPage() {
  const { user, setUser } = React.useContext(UserContext);
  const [listMode, setListMode] = React.useState(true);
  const [sortType, setSortType] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [showStarredOnly, setShowStarredOnly] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState(null);

  function mapTilerProvider(x, y, z, dpr) {
    return `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  }

  const [coops, setCoops] = React.useState([]);
  const [starredCoops, setStarredCoops] = React.useState([]);
  const [coopShown, setCoopShown] = React.useState([]);
  const [categoriesAndTags, setCategoriesAndTags] = React.useState([]);
  const [allTags, setAllTags] = React.useState([]);

  async function fetchAllCoops() {
    const res = await axios.get('/api/coops');
    setCoops(res.data);
  }

  React.useEffect(() => {
    async function fetchInitialData() {
      try {
        const res = await axios.get('/api/coops');
        setCoops(res.data);
        if (res.data.length !== 0) {
          setCoopShown(res.data[0]);
        }
      } catch (err) {
        setUser(null);
      }

      const tags = await axios.get('/api/tags');
      const modTag = tags.data.map(initializeCategoryOptions);
      setCategoriesAndTags(modTag);

      //get the toggle star info
      const starred = await axios.get('/api/getStarred');
      //set the query data as the starred coops
      let starredIds = starred.data.map(e => {
        return e.starred_coop_id;
      });
      setStarredCoops(starredIds);
    }
    fetchInitialData();
  }, [setUser]);

  if (!coops) {
    return <div>Loading...</div>;
  }

  function findSortType() {
    if (sortType['value'] === 'alphabetical') {
      return sortAlphabetically;
    } else if (sortType['value'] === 'distance') {
      return sortByDistance;
    }
  }

  function sortAlphabetically(coop1, coop2) {
    return coop1['coop_name'].toLowerCase() > coop2['coop_name'].toLowerCase()
      ? 1
      : -1;
  }

  function sortByDistance(coop1, coop2) {
    const distCoop1 = distance(coop1);
    const distCoop2 = distance(coop2);
    if (distCoop1 === distCoop2) {
      return 0;
    }
    return distCoop1 > distCoop2 ? 1 : -1;
  }

  function getDistanceToUser(coop) {
    const otherLat = coop['latitude'];
    const otherLon = coop['longitude'];
    const myLat = user['latitude'];
    const myLon = user['longitude'];
    return Math.sqrt((myLat - otherLat) ** 2 + (myLon - otherLon) ** 2);
  }

  function distance(coop) {
    const otherLat = coop['latitude'];
    const otherLon = coop['longitude'];
    const myLat = user['latitude'];
    const myLon = user['longitude'];

    if (myLat === otherLat && myLon === otherLon) {
      return 0;
    } else {
      let radlat1 = (Math.PI * myLat) / 180;
      let radlat2 = (Math.PI * otherLat) / 180;
      let theta = myLon - otherLon;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
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
      return [user.latitude, user.longitude];
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
    setAllTags([]);
    categoriesAndTags.map(categoryInfo => categoryInfo.reset(true));
    fetchAllCoops();
  }

  const sortOptions = [
    { value: 'alphabetical', label: 'sort: alphabetical' },
    { value: 'distance', label: 'sort: distance' },
  ];

  function handleStarToggle() {
    setSelectedIndex(null);
    showStarredOnly ? setShowStarredOnly(false) : setShowStarredOnly(true);
  }

  function handleChange(getCategoryDict) {
    async function onChange(event) {
      setSelectedIndex(null);
      const category = getCategoryDict();
      category['values'] = event;
      const categoryName = category['categoryName'];
      const tempAllTags = allTags.filter(
        tag => tag.categoryName !== categoryName
      );

      if (event != null) {
        event.map(tag => tempAllTags.push(tag));
      }
      setAllTags(tempAllTags);

      if (tempAllTags === null || tempAllTags.length === 0) {
        //NOT valid
        fetchAllCoops();
      } else {
        const params = {
          //we need to access every single array of tags, not just
          //the event that is passed in
          tags: tempAllTags.map(tag => tag.id),
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
                <Filters options={sortOptions} onChange={setSortType} />
                {categoriesAndTags &&
                  categoriesAndTags.map(categoryInfo => (
                    <Filters
                      isMulti={true}
                      title={categoryInfo.categoryName}
                      options={categoryInfo.options}
                      values={categoryInfo.values}
                      onChange={handleChange(categoryInfo.getCategory)}
                      key={categoryInfo}
                    />
                  ))}
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
