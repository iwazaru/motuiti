import isStoreValid from './isStoreValid';

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
      vacances: false,
    };
    expect(isStoreValid(store)).toBe(true);
  });

  it('returns false for a store with invalid longitude', () => {
    const store = {
      longitude: '01 45 69 59 59',
    };
    expect(isStoreValid(store)).toBe(false);
  });
});
