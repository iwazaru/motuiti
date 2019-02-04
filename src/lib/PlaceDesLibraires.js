import fetch from 'node-fetch';

export default class PlaceDesLibraires {
  // Get stores list for this EAN
  static async getStoresForEan(ean) {
    const response = await fetch(
      `https://www.placedeslibraires.fr/getshoplist.php?ISBN=${ean}`
    );
    const json = await response.json();
    return PlaceDesLibraires.filterStores(json.shop).map(
      PlaceDesLibraires.parseStore
    );
  }

  static filterStores(stores) {
    return stores
      .filter(store => store.stockAvailablility) // only those with available stock
      .filter(PlaceDesLibraires.isStoreValid); // remove invalid stores
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
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      logo,
    };
  }
}
