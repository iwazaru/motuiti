import { fitBounds } from 'google-map-react/utils';

export default function getBounds(locations) {
  const bounds = new window.google.maps.LatLngBounds();
  locations.forEach(({ latitude, longitude }) => {
    bounds.extend({ lat: latitude, lng: longitude });
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
    { width: window.innerWidth, height: window.innerHeight }
  );

  return { center, zoom };
}
