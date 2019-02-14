import controller from './stores';

const response = {
  setHeader: jest.fn(),
  status: jest.fn(),
  end: jest.fn()
};

jest.mock('../lib/getSecondsToTomorrow');

describe('Stores API', () => {
  it('returns stores for a valid EAN', async () => {
    Date.now = jest.fn(() => '1549363389130');
    const request = {
      url: 'http://www.example.org/api/stores?ean=9791091146357'
    };
    await controller(request, response);
    expect(response.setHeader).toBeCalledWith(
      'Content-Type',
      'application/json'
    );
    expect(response.setHeader).toBeCalledWith(
      'Cache-Control',
      'public, s-maxage=21468'
    );
    expect(response.end).toBeCalledWith(
      '{"ean":"9791091146357","date":"1549363389130","origin":"API","stores":[{"id":"2671","name":"Montbarbon","address":"14 Place Carriat","postalCode":"01000","city":"Bourg en bresse","phone":"0474234568","lat":46.207446,"lng":5.227266,"logo":"https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg"}]}'
    );
  });

  it('returns an error for an invalid EAN', async () => {
    const request = {
      url: 'http://www.example.org/api/stores?ean=invalid'
    };
    await controller(request, response);
    expect(response.statusCode).toBe(400);
    expect(response.end).toBeCalledWith(
      '{"error":"Cet ISBN semble invalide."}'
    );
  });
});
