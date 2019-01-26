import React from 'react';
import GoogleMapReact from 'google-map-react';

import Pin from './Pin';
import Store from './Store';
import Header from './Header';

export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 48.86543604815719,
      lng: 2.3405013838030584,
    },
    zoom: 13,
  };

  state = {
    stores: [],
    selectedStoreIndex: null,
  };

  async getStores(ean) {
    const response = await fetch(`/api/stores?ean=${ean}`);
    const { stores } = await response.json();
    this.setState({ stores });
  }

  onStoreSelect(selectedStoreIndex) {
    this.setState({ selectedStoreIndex });
  }

  render() {
    const { stores, selectedStoreIndex } = this.state;
    let markers = null;

    if (stores) {
      markers = stores.map(({ id, longitude, latitude, ...store }, index) => {
        return (
          <Pin
            key={id}
            lat={latitude}
            lng={longitude}
            selected={index === selectedStoreIndex}
            onClick={() => this.onStoreSelect(index)}
          />
        );
      });
    }

    let selectedStore = null;
    if (selectedStoreIndex) {
      let store = stores[selectedStoreIndex];
      selectedStore = <Store {...store} />;
    }

    return (
      <React.Fragment>
        <Header onSearch={ean => this.getStores(ean)} />
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDiB3cT5saF3t-4DJayd6zUAmlV5GjiQC0' }}
            options={() => ({ fullscreenControl: false })}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {markers}
          </GoogleMapReact>
          {selectedStore}
        </div>
      </React.Fragment>
    );
  }
}
