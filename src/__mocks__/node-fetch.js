export default function fetch(url) {
  const response = {
    status: url.includes('403') ? 403 : 200,
    text: () => {
      let text;

      if (url.includes('bad json')) {
        text = '<html>this is not json</html>';
      } else {
        text = JSON.stringify({
          shop: [
            {
              id: '2671',
              name: 'Montbarbon',
              address: '14 Place Carriat',
              postalCode: '01000',
              city: 'Bourg en bresse',
              phone: '0474234568',
              logo:
                'https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg',
              longitude: '5.227266',
              latitude: '46.207446',
              stockAvailablility: true,
              precommande: false,
              vacances: false
            }
          ]
        });
      }
      return Promise.resolve(text);
    }
  };
  return Promise.resolve(response);
}
