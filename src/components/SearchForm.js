import React from 'react';
import { Button } from './Button';

import processIsbn from '../lib/processIsbn';

export default class SearchForm extends React.Component {
  state = {
    query: '',
  };

  onFormSubmit(event) {
    event.preventDefault();

    if (this.state.query === '') {
      return;
    }

    try {
      const ean = processIsbn(this.state.query);
      this.props.onSearch(ean);
    } catch (error) {
      window.alert(error.message);
    }
  }

  onInputChange(query) {
    this.setState({ query });
  }

  render() {
    const { onGeolocate, searching, locating, located } = this.props;

    return (
      <form onSubmit={event => this.onFormSubmit(event)}>
        <input
          className="search-field"
          type="search"
          placeholder="ISBN du livre"
          value={this.state.query}
          onChange={event => this.onInputChange(event.target.value)}
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
}
