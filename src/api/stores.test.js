import handler from './stores';

const callback = jest.fn();

jest.mock('../lib/getSecondsToTomorrow');

describe('Stores API', () => {
  it('returns stores for a valid EAN', async () => {
    Date.now = jest.fn(() => '1549363389130');
    
    const event = {
      path: '/api/stores?ean=9791091146357'
    };
    await handler(event, {}, callback);
    expect(callback).toBeCalledWith(null, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=21468'
      },
      body:
        '{"ean":"9791091146357","date":"1549363389130","stores":[{"id":"2671","name":"Montbarbon","address":"14 Place Carriat","postalCode":"01000","city":"Bourg en bresse","phone":"0474234568","lat":46.207446,"lng":5.227266,"logo":"https://static.epagine.fr/mediaweb3/2671/logo_montbarbon.jpg"}]}',
      statusCode: 200
    });
  });

  it('returns an error for an invalid EAN', async () => {
    const event = {
      path: '/api/stores?ean=invalid'
    };
    await handler(event, {}, callback);
    expect(callback).toBeCalledWith(null, {
      body: '{"error":"Cet ISBN semble invalide."}',
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=21468'
      }
    });
  });
});
