import React from 'react';

import './Header.css';
import { Button } from './Button';

export default function Header({ onSearch, onGeolocate, searching, locating }) {
  function onFormSubmit(event) {
    event.preventDefault();
    const query = event.target.querySelector('.search-field').value;
    onSearch(query);
  }

  return (
    <div className="Header">
      <form onSubmit={onFormSubmit}>
        <input
          className="search-field"
          type="search"
          placeholder="ISBN du livre"
        />
        <Button
          type="submit"
          icon="search"
          label="Rechercher"
          loading={searching}
        />
        <Button
          icon="location-arrow"
          label="Me localiser"
          onClick={onGeolocate}
          loading={locating}
        />
      </form>
    </div>
  );
}
