import redis from 'redis';

import RedisCache from './RedisCache';

describe('RedisCache', () => {
  describe('constructor', () => {
    it('silently fails if no redis url is provided', () => {
      const cache = new RedisCache();
      expect(redis.createClient).not.toBeCalled();
      expect(cache.redis).toBe(null);
    });

    it('creates a redis client', () => {
      const cache = new RedisCache('redis://example.org');
      expect(redis.createClient).toBeCalledWith('redis://example.org');
      expect(cache.redis).not.toBe(null);
    });
  });

  describe('open', () => {
    it('returns null if not connected to redis', async () => {
      const cache = new RedisCache();
      const result = await cache.open('cacheKey');
      expect(result).toBe(null);
    });

    it('returns cache value for provided key', async () => {
      const cache = new RedisCache('http://example.org');
      const result = await cache.open('cacheKey');
      expect(cache.redis.get).toBeCalledWith('cacheKey', expect.any(Function));
      expect(result).toBe('{"cachedValue":"I\'m cached!"}');
    });
  });

  describe('save', () => {
    it('returns null if not connected to redis', async () => {
      const cache = new RedisCache();
      const result = await cache.save('cacheKey', 'cacheValue');
      expect(result).toBe(null);
    });

    it('saves cache value for provided key', async () => {
      const cache = new RedisCache('http://example.org');
      const result = await cache.save('cacheKey', 'cacheValue', 84480);
      expect(cache.redis.set).toBeCalledWith(
        'cacheKey',
        'cacheValue',
        'EX',
        84480,
        expect.any(Function)
      );
      expect(result).toBe('OK')
    });
  });

  describe('close', () => {
    it('quits redis', () => {
      const cache = new RedisCache('http://example.org');
      cache.close();
      expect(cache.redis.quit).toBeCalled();
    })
  })
});
