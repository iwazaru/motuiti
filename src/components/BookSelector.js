import React from 'react';

class BookSelector extends React.Component {
  componentDidMount() {
    const { ean } = this.props.match.params;
    this.props.onLoad(ean);
  }

  render() {
    return null;
  }
}

export default BookSelector;
