import React from "react";

import "./Header.css";

export default function Header({ onSearch }) {
  function onFormSubmit(event) {
    event.preventDefault();
    const query = event.target.querySelector(".search-field").value;
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
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
}
