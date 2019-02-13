import React from 'react';

import { Button } from './Button';

export default function SearchForm({
  located,
  locating,
  onGeolocate,
  onSearchFieldChange,
  onSearchFormSubmit,
  query,
  searching
}) {
  return (
    <form onSubmit={event => onSearchFormSubmit(event)}>
      <input
        className="search-field"
        type="search"
        placeholder="ISBN du livre"
        value={query}
        onChange={onSearchFieldChange}
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
        toggled={located}
      />
    </form>
  );
}
