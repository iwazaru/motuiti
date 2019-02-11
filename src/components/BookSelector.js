import React from 'react';

class BookSelector extends React.Component {
  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.ean !== prevProps.match.params.ean) {
      this.search()
    }
  }

  search() {
    const { ean } = this.props.match.params;
    this.props.onLoad(ean);
  }

  render() {
    return null;
  }
}

export default BookSelector;
