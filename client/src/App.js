import NavBar from './navbar.js';
import React from 'react';
import FiltersPage from './FiltersPage.js';

export default function App() {
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  // Map and List view mode buttons

  return (
    <div className="App">
      <NavBar username="Rad Radishes" />
      <FiltersPage />{' '}
    </div>
  );
}
