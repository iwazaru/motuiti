import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import BookSelector from './BookSelector';
import Pin from './Pin';
import Store from './Store';
import Header from './Header';
import UserPin from './UserPin';

import Geo from '../lib/Geo';
import processIsbn from '../lib/processIsbn';

import './Map.css';

const DEFAULT_CENTER = {
  lat: 46.98140721416764,
  lng: 1.7822031499999865,
};
const DEFAULT_ZOOM = 6;

const history = createBrowserHistory();

export default class Map extends React.Component {
  state = {
    stores: [],
    selectedStoreIndex: null,
    userPosition: null,
    searching: false,
    locating: false,
    located: false,
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  };

  async getStores(query) {
    try {
      const ean = processIsbn(query);

      this.setState({ stores: [], searching: true });
      const response = await fetch(`/api/stores/${ean}`);
      const { stores } = await response.json();

      this.setState({ stores, searching: false, selectedStoreIndex: null });
      this.updateMapPosition();
    } catch (error) {
      window.alert(error.message);
    }
  }

  onGeolocate() {
    if (this.state.located) {
      this.setState({ userPosition: null, located: false });
      return;
    }

    this.setState({ locating: true });
    navigator.geolocation.getCurrentPosition(position => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.setState({ userPosition, locating: false, located: true });
      this.updateMapPosition();
    });
  }

  /**
   * Update map position:
   * - to display closest store and user position if both are known
   * - to display all stores if user position is unknown
   */
  updateMapPosition() {
    const { userPosition, stores } = this.state;

    // If there is stores on the map and user position is known,
    // move map to show user and closest store
    if (userPosition && stores.length > 0) {
      const closestStore = Geo.getClosestLocation(userPosition, stores);
      const { center, zoom } = Geo.getBounds([
        {
          lat: userPosition.lat,
          lng: userPosition.lng,
        },
        closestStore,
      ]);

      this.setState({ center, zoom: zoom - 1 });
      return;
    }

    // If there is stores on the map but user position is unkown,
    // move map to show all stores
    if (stores.length > 0) {
      const { center, zoom } = Geo.getBounds(stores);

      this.setState({ center, zoom });
      return;
    }
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
      located,
    } = this.state;
    let markers = null;

    if (stores) {
      markers = stores.map(({ id, lng, lat, ...store }, index) => {
        return (
          <Pin
            key={id}
            lat={lat}
            lng={lng}
            selected={index === selectedStoreIndex}
            onClick={() => this.onStoreSelect(index)}
          />
        );
      });
    }

    let selectedStore = null;
    if (selectedStoreIndex !== null) {
      let store = stores[selectedStoreIndex];
      selectedStore = <Store {...store} />;
    }

    const bookSelector = props => (
      <BookSelector {...props} onLoad={ean => this.getStores(ean)} />
    );

    return (
      <Router history={history}>
        <React.Fragment>
          <Header
            onSearch={ean => this.getStores(ean)}
            onGeolocate={coords => this.onGeolocate(coords)}
            searching={searching}
            locating={locating}
            located={located}
            history={history}
          />
          <div className="Map" style={{}}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GMAPS_API_KEY,
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
          <Route path="/livre/:ean/" render={bookSelector} />
        </React.Fragment>
      </Router>
    );
  }
}
