import fetch from 'node-fetch';

export default class PlaceDesLibraires {
  // Get stores list for this EAN
  static async getStoresForEan(ean) {
    const response = await fetch(
      `https://www.placedeslibraires.fr/getshoplist.php?ISBN=${ean}`
    );
    const body = await response.text();

    try {
      const json = JSON.parse(body);
      return PlaceDesLibraires.filterStores(json.shop).map(
        PlaceDesLibraires.parseStore
      );
    } catch (error) {
      process.stdout.write(
        "An error occured while parsing Place des Libraires's response:\n"
      );
      process.stdout.write(`${body}\n`);
      throw new Error(`Could not parse: ${body}`);
    }
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
    logo
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
      logo
    };
  }
}
