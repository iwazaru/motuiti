export default {
  createClient: jest.fn(() => {
    return {
      get: jest.fn((key, callback) => {
        callback(null, '{"cachedValue":"I\'m cached!"}');
      }),
      set: jest.fn((key, value, ex, ttl, callback) => {
        callback(null, 'OK');
      }),
      quit: jest.fn(),
    }
  })
};