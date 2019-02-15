import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

import BookSelector from './BookSelector';
import Pin from './Pin';
import Store from './Store';
import Header from './Header';
import UserPin from './UserPin';

import Geo from '../lib/Geo';
import processIsbn from '../lib/processIsbn';

import './Map.css';
import AboutPage from './AboutPage';

const DEFAULT_CENTER = {
  lat: 46.98140721416764,
  lng: 1.7822031499999865
};
const DEFAULT_ZOOM = 6;

const history = createBrowserHistory();

const { REACT_APP_GOOGLE_ANALYTICS_ID } = process.env;
if (REACT_APP_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(REACT_APP_GOOGLE_ANALYTICS_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);

  history.listen(function(location) {
    ReactGA.set({ page: location.pathname + location.search });
    ReactGA.pageview(location.pathname + location.search);
  });
}

export default class Map extends React.Component {
  state = {
    query: '',
    stores: [],
    selectedStoreIndex: null,
    userPosition: null,
    searching: false,
    locating: false,
    located: false,
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM
  };

  async getStores(query) {
    if (typeof query === 'undefined') {
      this.setState({
        stores: [],
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM
      });
      return;
    }

    try {
      const ean = processIsbn(query);

      this.setState({
        query,
        stores: [],
        searching: true
      });
      const response = await fetch(`/api/stores/${ean}`, {
        headers: {
          Accept: 'application/json'
        }
      });
      const { stores } = await response.json();

      this.setState({
        stores,
        searching: false,
        selectedStoreIndex: null
      });
      this.updateMapPosition();
    } catch (error) {
      if (error instanceof SyntaxError) {
        window.alert("La réponse du serveur n'a pas pu être déchiffrée.");
      } else {
        window.alert(error.message);
      }

      console.error(error);
    }
  }

  onGeolocate() {
    if (this.state.located) {
      this.setState({
        userPosition: null,
        located: false
      });
      return;
    }

    this.setState({ locating: true });
    navigator.geolocation.getCurrentPosition(position => {
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.setState({
        userPosition,
        locating: false,
        located: true
      });
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
          lng: userPosition.lng
        },
        closestStore
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

  onSearchFieldChange(query) {
    this.setState({ query });
  }

  onSearchFormSubmit(event) {
    event.preventDefault();

    if (this.state.query === '') {
      return;
    }

    try {
      const ean = processIsbn(this.state.query);
      history.push(`/search?q=${ean}`);
    } catch (error) {
      window.alert(error.message);
    }
  }

  render() {
    const {
      center,
      located,
      locating,
      query,
      searching,
      selectedStoreIndex,
      stores,
      userPosition,
      zoom
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

    const bookSelector = props => {
      return <BookSelector {...props} onLoad={ean => this.getStores(ean)} />;
    };

    return (
      <Router history={history}>
        <React.Fragment>
          <Header
            located={located}
            locating={locating}
            onGeolocate={coords => this.onGeolocate(coords)}
            onSearchFieldChange={event =>
              this.onSearchFieldChange(event.target.value)
            }
            onSearchFormSubmit={event => this.onSearchFormSubmit(event)}
            query={query}
            searching={searching}
          />
          <div className="Map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPS_API_KEY }}
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
          <Route path="/" exact render={bookSelector} />
          <Route path="/search" render={bookSelector} />
          <Route path="/a-propos" render={AboutPage} />
        </React.Fragment>
      </Router>
    );
  }
}
