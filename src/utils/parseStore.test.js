import parseStore from './parseStore';

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
      longitude: '5.227266',
      latitude: '46.207446',
      stockAvailablility: true,
      precommande: false,
      vacances: false,
    };
    expect(parseStore(store)).toMatchInlineSnapshot(`
Object {
  "address": "14 Place Carriat",
  "city": "Bourg en bresse",
  "id": "2671",
  "latitude": 46.207446,
  "logo": "https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg",
  "longitude": 5.227266,
  "name": "Montbarbon",
  "phone": "0474234568",
  "postalCode": "01000",
}
`);
  });
});
