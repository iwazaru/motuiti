import React from 'react';
import qs from 'query-string';

class BookSelector extends React.Component {
  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.search();
    }
  }

  search() {
    const { search } = this.props.location;
    const { q } = qs.parse(search);
    this.props.onLoad(q);
  }

  render() {
    return null;
  }
}

export default BookSelector;
