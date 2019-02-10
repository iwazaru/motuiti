import redis from 'redis';

export default class RedisCache {

  /**
   * Connect to Redis
   */
  constructor(redisUrl) {
    this.redis = null;

    if (redisUrl) {
      this.redis = redis.createClient(redisUrl);
    }
  }

  /**
   * Lookup cache for a key
   * @param {String} key
   */
  open(key) {
    if (this.redis === null) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.redis.get(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          if (reply === null) {
            process.stdout.write(`Did not found key ${key} in cache\n`);
            resolve(null);
            return;
          }

          process.stdout.write(`Got cached value for key ${key}\n`);
          resolve(reply);
        }
      });
    });
  }

  /**
   * Save value in cache
   * @param {String} key
   * @param {String} value
   * @param {Number} ttl
   */
  save(key, value, ttl) {
    if (this.redis === null) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.redis.set(key, value, 'EX', ttl, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          process.stdout.write(`Stored ${key} in cache (ttl: ${ttl})\n`);
          resolve(reply);
        }
      });
    });
  }

  /**
   * Close connection to redis
   */
  close() {
    if (this.redis) {
      this.redis.quit();
    }
  }
}
