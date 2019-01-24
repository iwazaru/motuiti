import React from 'react';
import GoogleMapReact from 'google-map-react';

import Pin from './Pin';

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
  };

  async getStores(ean) {
    const response = await fetch(`/api/stores?ean=${ean}`);
    const { stores } = await response.json();
    this.setState({ stores });
  }

  async componentDidMount() {
    await this.getStores('9791091146357');
  }

  render() {
    const { stores } = this.state;
    let markers = null;

    if (stores) {
      markers = stores.map(({ id, longitude, latitude, ...props }) => {
        return <Pin key={id} lat={latitude} lng={longitude} {...props} />;
      });
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
      </div>
    );
  }
}
