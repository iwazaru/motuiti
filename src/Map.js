import React from 'react';
import GoogleMapReact from 'google-map-react';

import Pin from './Pin';
import Store from './Store';

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
    selectedStore: null,
  };

  async getStores(ean) {
    const response = await fetch(`/api/stores?ean=${ean}`);
    const { stores } = await response.json();
    this.setState({ stores });
  }

  async componentDidMount() {
    await this.getStores('9791091146357');
  }

  onStoreSelect(selectedStore) {
    this.setState({ selectedStore });
  }

  render() {
    const { stores, selectedStore } = this.state;
    let markers = null;

    if (stores) {
      markers = stores.map(({ id, longitude, latitude, ...store }) => {
        return (
          <Pin
            key={id}
            lat={latitude}
            lng={longitude}
            onClick={() => this.onStoreSelect(store)}
          />
        );
      });
    }

    let selectedStoreComp = null;
    if (selectedStore) {
      selectedStoreComp = <Store {...selectedStore} />;
    }

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDiB3cT5saF3t-4DJayd6zUAmlV5GjiQC0' }}
          options={() => ({ fullscreenControl: false })}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {markers}
        </GoogleMapReact>
        {selectedStoreComp}
      </div>
    );
  }
}
