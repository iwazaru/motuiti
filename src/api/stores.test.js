import controller from './stores';

const response = {
  setHeader: jest.fn(),
  status: jest.fn(),
  end: jest.fn(),
};

jest.mock('../lib/getSecondsToTomorrow');

describe('Stores API', () => {
  it('returns stores for a valid EAN', async () => {
    Date.now = jest.fn(() => '1549363389130');
    const request = {
      url: 'http://www.example.org/api/stores?ean=9791091146357',
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
      '{"ean":"9791091146357","date":"1549363389130","origin":"Cache","stores":{"cachedValue":"I\'m cached!"}}'
    );
  });

  it('returns an error for an invalid EAN', async () => {
    const request = {
      url: 'http://www.example.org/api/stores?ean=invalid',
    };
    await controller(request, response);
    expect(response.statusCode).toBe(400);
    expect(response.end).toBeCalledWith(
      '{"error":"Cet ISBN semble invalide."}'
    );
  });
});
