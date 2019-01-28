import React from 'react';

import './Header.css';

export default function Header({ onSearch, onGeolocate }) {
  function onFormSubmit(event) {
    event.preventDefault();
    const query = event.target.querySelector('.search-field').value;
    onSearch(query);
  }

  function onGeolocateButtonClick() {
    navigator.geolocation.getCurrentPosition(position => {
      onGeolocate(position.coords);
    });
  }

  return (
    <div className="Header">
      <form onSubmit={onFormSubmit}>
        <input
          className="search-field"
          type="search"
          placeholder="ISBN du livre"
        />
        <button type="submit">
          <span class="fas fa-search" aria-label="Rechercher" />
        </button>
        <button type="button" onClick={onGeolocateButtonClick}>
          <span class="fas fa-location-arrow" aria-label="Me localiser" />
        </button>
      </form>
    </div>
  );
}
