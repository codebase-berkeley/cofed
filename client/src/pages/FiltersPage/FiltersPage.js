import './FiltersPage.css';
import tina from '../../assets/tina.png';
import Card from '../../components/Card/Card';
import Filters from '../../components/Filter/Filter';
import NavBar from '../../components/Navbar/Navbar';
import React from 'react';
import Profile from '../../components/Profile/Profile';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

export default function FiltersPage() {
  const [listMode, setListMode] = React.useState(true);

  function mapTilerProvider(x, y, z, dpr) {
    return `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  }

  const coops = [
    {
      name: 'Radish Co-op',
      location: {
        address: 'San Diego CA',
        lat: 37.7157, // latitude (calculated with Geocoding)
        lng: -117.1611, // longitude (calculated with Geocoding)
      },
      email: 'coopemail@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'black-owned'],
      mission: 'lorem ipsum',
      description: 'lorem upsum',
      profile_picture: tina,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: 'Beet Co-op',
      location: {
        address: 'Seattle WA',
        lat: 47.6062, // latitude (calculated with Geocoding)
        lng: -122.3321, // longitude (calculated with Geocoding)
      },
      email: 'coopemail@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'black-owned'],
      mission: 'lorem ipsum',
      description: 'lorem upsum',
      profile_picture: tina,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: 'Carrot Co-op',
      location: {
        address: 'Berkeley CA',
        lat: 37.8715, // latitude (calculated with Geocoding)
        lng: -122.273, // longitude (calculated with Geocoding)
      },
      email: 'coopemail@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'black-owned'],
      mission: 'lorem ipsum',
      description: 'lorem upsum',
      profile_picture: tina,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: 'Corn Co-op',
      location: {
        address: 'Cupertino CA',
        lat: 37.323, // latitude (calculated with Geocoding)
        lng: -122.0322, // longitude (calculated with Geocoding)
      },
      email: 'coopemail@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'black-owned'],
      mission: 'lorem ipsum',
      description: 'lorem upsum',
      profile_picture: tina,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: 'Cabbage Co-op',
      location: {
        address: 'Santa Rosa CA',
        lat: 38.4404, // latitude (calculated with Geocoding)
        lng: -122.7141, // longitude (calculated with Geocoding)
      },
      email: 'coopemail@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'black-owned'],
      mission: 'lorem ipsum',
      description: 'lorem upsum',
      profile_picture: tina,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: 'Eric Eggplant Co-op',
      location: {
        address: 'North Potomac MD',
        lat: 39.0978, // latitude (calculated with Geocoding)
        lng: 77.2348, // longitude (calculated with Geocoding)
      },
      email: 'ericEggplants@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'eggplants', 'non-GMO'],
      mission: 'lorem ipsum',
      description: 'lorem upsum',
      profile_picture: tina,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
  ];

  function renderListView() {
    return (
      <div className="list-mode">
        {coops.map((coop, index) => (
          <Card
            key={index}
            profile={coop.profile_picture}
            name={coop.name}
            location={coop.location.address}
            tags={coop.tags}
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
          center={[coops[0].location.lat, coops[0].location.lng]}
          zoom={6}
          twoFingerDrag={true}
          provider={mapTilerProvider}
        >
          {coops.map((coop, index) => (
            <Marker
              payload={index}
              key={index}
              anchor={[coop.location.lat, coop.location.lng]}
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
    setCoop(coop);
    setSelectedIndex(index);
  }

  const [location, setLocation] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [race, setRace] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [other, setOther] = React.useState([]);
  const [coop, setCoop] = React.useState(coops[0]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
            {listMode ? renderListView() : renderMapView()}
          </div>
        </div>
        <div className="content">
          <div className="right-content">
            {coop && <Profile allowView={true} allowEdit={false} coop={coop} />}
          </div>
        </div>
      </div>
    </div>
  );
}
