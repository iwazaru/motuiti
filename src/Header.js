import React from "react";

import "./Header.css";

export default function Header({ onSearch, onGeolocate }) {
  function onFormSubmit(event) {
    event.preventDefault();
    const query = event.target.querySelector(".search-field").value;
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
        <button type="submit">Rechercher</button>
        <button type="button" onClick={onGeolocateButtonClick}>
          Me localiser
        </button>
      </form>
    </div>
  );
}
