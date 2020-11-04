import './FiltersPage.css';
import tina from '../../assets/tina.png';
import toad from '../../assets/toad.png';
import burger from '../../assets/burger.png';
import eggplanted from '../../assets/eggplanted.jpg';
import cheese from '../../assets/cheese.png';
import radish from '../../assets/radish.png';
import heihei from '../../assets/heihei.png';

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
      name: "Bianca's Squash",
      location: {
        address: 'Berkeley, CA',
        lat: 37.7157, // latitude (calculated with Geocoding)
        lng: -117.1611, // longitude (calculated with Geocoding)
      },
      email: 'coopemail@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'black-owned'],
      mission: 'lorem ipsum',
      description: 'lorem upsum',
      profilePicture: tina,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: "Richard's Mushrooms",
      location: {
        address: 'Seattle, WA',
        lat: 47.6062, // latitude (calculated with Geocoding)
        lng: -122.3321, // longitude (calculated with Geocoding)
      },
      email: 'coopemail@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'vegan', 'fair trade'],
      mission: 'To promote the welfare of the mushroom kingdom.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      profilePicture: toad,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: "Claire's Radishes",
      location: {
        address: 'Berkeley, CA',
        lat: 37.8715, // latitude (calculated with Geocoding)
        lng: -122.273, // longitude (calculated with Geocoding)
      },
      email: 'claireradishes@gmail.com',
      phone: '555-555-5555',
      website: 'https://loveradish.co.uk/',
      tags: ['radish', 'Distributor', 'Asian-Owned', 'vegetables', 'crunchy'],
      mission:
        'To distribute radishes to as many people as possible. Expose the spicy, crunchiness to the world.',
      description: 'Radishes are life',
      profilePicture: radish,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: "Jane's Onions",
      location: {
        address: 'Cupertino, CA',
        lat: 37.323, // latitude (calculated with Geocoding)
        lng: -122.0322, // longitude (calculated with Geocoding)
      },
      email: 'coopemail@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'black-owned'],
      mission: 'lorem ipsum',
      description: 'lorem upsum',
      profilePicture: tina,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: "Ranon's Cheese",
      location: {
        address: 'Bangkok, TH',
        lat: 13.7563, // latitude (calculated with Geocoding)
        lng: 100.5018, // longitude (calculated with Geocoding)
      },
      email: 'ranonscheese@gmail.com',
      phone: '+66856783344',
      website: 'https://www.ranonsthaicheese.coop/',
      tags: ['organic', 'international'],
      mission:
        'Provide the best cheese from humanely raised, rescued Thai cows.',
      description:
        'Only the best Thai cheese! From only the best and happiest Thai cows!',
      profilePicture: cheese,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: "Eric's Eggplants",
      location: {
        address: 'North Potomac, MD',
        lat: 39.0978, // latitude (calculated with Geocoding)
        lng: -77.2348, // longitude (calculated with Geocoding)
      },
      email: 'ericEggplants@gmail.com',
      phone: '555-555-5555',
      website: 'https://www.cofed.coop/',
      tags: ['organic', 'eggplants', 'non-GMO'],
      mission: 'Raise organic eggplants without harming chickenplants',
      description:
        'We are a chicken-friendly institution. We are proud to say that no chickenplants are ever harmed on under our watch',
      profilePicture: eggplanted,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: "Isabel's Burgers",
      location: {
        address: 'Auckland, NZ',
        lat: -36.8771, // latitude (calculated with Geocoding)
        lng: 174.914565, // longitude (calculated with Geocoding)
      },
      email: 'isabel@burgers.com',
      phone: '555-555-5555',
      website: 'https://www.isabelsburgers.org/',
      tags: ['burgers', 'startup', 'non-GMO', 'food distributor'],
      mission: 'To promote and make known the universal appeal of burgers.',
      description:
        "Isabel's burgers is a startup food distributor operating locally in Auckland, New Zealand. We service restaurants, retail stores, and educational institutions. We focus on burgers, but also deliver and distribute a range of other non-GMO foods. We are able to offer vegan options for all our burgers, including those made with synthetic meats.",
      profilePicture: burger,
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    {
      name: "Zaid's Chickens",
      location: {
        address: 'Tracy, CA',
        lat: 37.6915, // latitude (calculated with Geocoding)
        lng: -121.4348, // longitude (calculated with Geocoding)
      },
      email: 'yummychicken@gmail.com',
      phone: '209-555-5555',
      website: 'https://www.chicken.coop/',
      tags: ['meat', 'chickens', 'non-GMO', 'poultry', 'cooperative'],
      mission: 'Coop with Coops',
      description:
        "Our chickens are grass-fed and produce the highest quality Grade AA eggs. Our quality of meat can't be beat!",
      profilePicture: heihei,
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
            profile={coop.profilePicture}
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
            {coop && <Profile allowView={true} allowEdit={false} coop={coop} />}
          </div>
        </div>
      </div>
    </div>
  );
}
