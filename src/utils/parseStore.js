export default function parseStore({
  id,
  name,
  address,
  postalCode,
  city,
  phone,
  latitude,
  longitude,
  logo,
}) {
  return {
    id,
    name,
    address,
    postalCode,
    city,
    phone,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    logo,
  };
}
