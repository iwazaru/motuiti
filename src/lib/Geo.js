import { fitBounds } from 'google-map-react/utils';

const HEADER_HEIGHT = 50; // px

export default class Geo {
  static getBounds(locations) {
    if (locations.length === 1) {
      const { lat, lng } = locations[0];
      return {
        center: { lat, lng },
        zoom: 13,
      };
    }

    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(({ lat, lng }) => {
      bounds.extend({ lat, lng });
    });

    const ne = {
      lat: bounds.getNorthEast().lat(),
      lng: bounds.getNorthEast().lng(),
    };
    const sw = {
      lat: bounds.getSouthWest().lat(),
      lng: bounds.getSouthWest().lng(),
    };

    const { center, zoom } = fitBounds(
      { ne, sw },
      { width: window.innerWidth, height: window.innerHeight - HEADER_HEIGHT }
    );

    return { center, zoom };
  }

  static calculateDistance(lat1, lng1, lat2, lng2, unit) {
    if (lat1 === lat2 && lng1 === lng2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lng1 - lng2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') {
        dist = dist * 1.609344;
      }
      if (unit === 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  static getClosestLocation(position, locations) {
    const locationsWithDistances = locations.map(location => {
      const distance = Geo.calculateDistance(
        position.lat,
        position.lng,
        location.lat,
        location.lng,
        'K'
      );
      return {
        ...location,
        distance,
      };
    });

    const sortedLocations = locationsWithDistances.sort((a, b) => {
      return a.distance - b.distance;
    });
    return sortedLocations[0];
  }
}
