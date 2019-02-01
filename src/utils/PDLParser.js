export default class PDLParser {
  static filterStores(stores) {
    return stores
      .filter(store => store.stockAvailablility) // only those with available stock
      .filter(PDLParser.isStoreValid); // remove invalid stores
  }

  static isStoreValid(store) {
    if (isNaN(store.latitude) || isNaN(store.longitude)) {
      return false;
    }

    return true;
  }

  static parseStore({
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
}