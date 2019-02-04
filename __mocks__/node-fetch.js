export default function fetch() {
  const response = {
    json: () => ({
      shop: [
        {
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
        },
      ],
    }),
  };
  return Promise.resolve(response);
}
