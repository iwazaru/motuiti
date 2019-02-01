import React from "react";
import GoogleMapReact from "google-map-react";

import Pin from "./Pin";
import Store from "./Store";
import Header from "./Header";
import UserPin from "./UserPin";

import Geo from "../utils/Geo";

const DEFAULT_CENTER = {
  lat: 46.98140721416764,
  lng: 1.7822031499999865
};
const DEFAULT_ZOOM = 6;

export default class Map extends React.Component {
  state = {
    stores: [],
    selectedStoreIndex: null,
    userPosition: null,
    searching: false,
    locating: false,
    located: false,
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM
  };

  async getStores(ean) {
    this.setState({ searching: true });
    const response = await fetch(`/api/stores?ean=${ean}`);
    const { stores } = await response.json();

    this.setState({ stores, searching: false, selectedStoreIndex: null });
    this.updateMapPosition();
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
        lng: position.coords.longitude
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
    } else if (stores.length > 0) {
      const { center, zoom } = Geo.getBounds(stores);

      this.setState({ center, zoom });
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
      located
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
          located={located}
        />
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDiB3cT5saF3t-4DJayd6zUAmlV5GjiQC0"
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
