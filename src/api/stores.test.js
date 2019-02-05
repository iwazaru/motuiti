import controller from './stores';

describe('Stores API', () => {
  it('returns stores for a valid EAN', async () => {
    Date.now = jest.fn(() => '1549363389130');
    const response = {
      setHeader: jest.fn(),
      end: jest.fn(),
    };
    const request = {
      url: 'http://www.example.org/api/stores?ean=9781234567890',
    };
    await controller(request, response);
    expect(response.setHeader).toBeCalledWith(
      'Content-Type',
      'application/json'
    );
    expect(response.end).toBeCalledWith(
      '{"ean":"9781234567890","date":"1549363389130","stores":[{"id":"2671","name":"Montbarbon","address":"14 Place Carriat","postalCode":"01000","city":"Bourg en bresse","phone":"0474234568","lat":46.207446,"lng":5.227266,"logo":"https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg"}]}'
    );
  });
});
