import PlaceDesLibraires from './PlaceDesLibraires';

describe('PlaceDesLibraires', () => {
  describe('getStoresForEan', () => {
    it('return a stores array', async () => {
      const stores = await PlaceDesLibraires.getStoresForEan('978123456789');
      expect(stores).toMatchInlineSnapshot(`
Array [
  Object {
    "address": "14 Place Carriat",
    "city": "Bourg en bresse",
    "id": "2671",
    "lat": 46.207446,
    "lng": 5.227266,
    "logo": "https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg",
    "name": "Montbarbon",
    "phone": "0474234568",
    "postalCode": "01000",
  },
]
`);
    });

    it('handles json parsing error', async () => {
      expect(PlaceDesLibraires.getStoresForEan('bad json')).rejects.toEqual(
        new Error('Could not parse: <html>this is not json</html>')
      );
    });
  });

  describe('filterStores', () => {
    it('filter stores to remove invalid ones', () => {
      const stores = [
        {
          name: 'valid store',
          stockAvailablility: true,
          latitude: '1',
          longitude: '2'
        },
        {
          name: 'store without availability',
          stockAvailablility: false,
          latitude: '4.5',
          longitude: '5.4'
        },
        {
          name: 'store with invalid lng',
          stockAvailablility: true,
          latitude: '1.23',
          longitude: '01 45 73 48 29'
        }
      ];
      expect(PlaceDesLibraires.filterStores(stores)).toMatchInlineSnapshot(`
Array [
  Object {
    "latitude": "1",
    "longitude": "2",
    "name": "valid store",
    "stockAvailablility": true,
  },
]
`);
    });
  });

  describe('isStoreValid', () => {
    it('returns true for a valid store', () => {
      const store = {
        id: '2671',
        name: 'Montbarbon',
        address: '14 Place Carriat',
        postalCode: '01000',
        city: 'Bourg en bresse',
        phone: '0474234568',
        logo: 'https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg',
        longitude: '5.227266',
        latitude: '46.207446',
        stockAvailablility: true,
        precommande: false,
        vacances: false
      };
      expect(PlaceDesLibraires.isStoreValid(store)).toBe(true);
    });

    it('returns false for a store with invalid lng', () => {
      const store = {
        lng: '01 45 69 59 59'
      };
      expect(PlaceDesLibraires.isStoreValid(store)).toBe(false);
    });
  });

  describe('parseStore', () => {
    it('parse a store', () => {
      const store = {
        id: '2671',
        name: 'Montbarbon',
        address: '14 Place Carriat',
        postalCode: '01000',
        city: 'Bourg en bresse',
        phone: '0474234568',
        logo: 'https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg',
        lng: '5.227266',
        lat: '46.207446',
        stockAvailablility: true,
        precommande: false,
        vacances: false
      };
      expect(PlaceDesLibraires.parseStore(store)).toMatchInlineSnapshot(`
Object {
  "address": "14 Place Carriat",
  "city": "Bourg en bresse",
  "id": "2671",
  "lat": NaN,
  "lng": NaN,
  "logo": "https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg",
  "name": "Montbarbon",
  "phone": "0474234568",
  "postalCode": "01000",
}
`);
    });
  });
});
