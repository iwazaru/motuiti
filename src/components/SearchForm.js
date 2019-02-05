import React from 'react';
import { Button } from './Button';
import IsbnUtils from 'isbn-utils';

export default class SearchForm extends React.Component {
  state = {
    query: '',
    ean: null,
  };

  onFormSubmit(event) {
    event.preventDefault();

    if (this.state.query === '') {
      return;
    }

    if (this.state.ean === null) {
      window.alert('Cet ISBN semble invalide.');
      return;
    }

    this.props.onSearch(this.state.ean);
  }

  onInputChange(query) {
    const isbn = IsbnUtils.parse(query);

    if (isbn) {
      const ean = isbn.asIsbn13();
      this.setState({ ean });
    } else {
      this.setState({ ean: null });
    }

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
