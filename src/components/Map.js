import React from 'react';
import GoogleMapReact from 'google-map-react';

import Pin from './Pin';
import Store from './Store';
import Header from './Header';
import UserPin from './UserPin';

import getBounds from '../utils/getBounds';
import { getClosestLocation } from '../utils/getClosestLocation';

export default class Map extends React.Component {
  state = {
    stores: [],
    selectedStoreIndex: null,
    userPosition: null,
    searching: false,
    locating: false,
    center: {
      lat: 46.98140721416763,
      lng: 1.7822031499999866,
    },
    zoom: 6,
  };

  async getStores(ean) {
    this.setState({ searching: true });
    const response = await fetch(`/api/stores?ean=${ean}`);
    const { stores } = await response.json();

    // Reposition map to show all stores
    const { center, zoom } = getBounds(stores);

    this.setState({ stores, searching: false, center, zoom });
  }

  onGeolocate(coords) {
    this.setState({ locating: true });
    navigator.geolocation.getCurrentPosition(position => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      const closestStore = getClosestLocation(userPosition, this.state.stores);
      const { center, zoom } = getBounds([
        {
          latitude: userPosition.lat,
          longitude: userPosition.lng,
        },
        closestStore,
      ]);

      this.setState({ userPosition, locating: false, center, zoom: zoom - 1 });
    });
  }

  onStoreSelect(selectedStoreIndex) {
    this.setState({ selectedStoreIndex });
  }

  render() {
    const {
      center,
      zoom,
      stores,
      selectedStoreIndex,
      userPosition,
      searching,
      locating,
    } = this.state;
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
        <Header
          onSearch={ean => this.getStores(ean)}
          onGeolocate={coords => this.onGeolocate(coords)}
          searching={searching}
          locating={locating}
        />
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDiB3cT5saF3t-4DJayd6zUAmlV5GjiQC0',
            }}
            options={() => ({ fullscreenControl: false })}
            center={center}
            zoom={zoom}
          >
            {markers}
            {userPosition && (
              <UserPin lat={userPosition.lat} lng={userPosition.lng} />
            )}
          </GoogleMapReact>
          {selectedStore}
        </div>
      </React.Fragment>
    );
  }
}
