import React from 'react';
import GoogleMapReact from 'google-map-react';

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 46.9377707486953,
      lng: 3.0712326615878,
    },
    zoom: 7,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDiB3cT5saF3t-4DJayd6zUAmlV5GjiQC0' }}
          options={() => ({ fullscreenControl: false })}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />
      </div>
    );
  }
}

export default SimpleMap;
