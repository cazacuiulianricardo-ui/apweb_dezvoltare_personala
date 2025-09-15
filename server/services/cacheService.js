const memoryCache = require('memory-cache');

class CacheService {
  constructor() {
    this.defaultTTL = 60 * 1000;
  }

  get(key) {
    return memoryCache.get(key);
  }

  set(key, value, ttl = this.defaultTTL) {
    memoryCache.put(key, value, ttl);
  }

  isSet(key) {
    const val = memoryCache.get(key);
    return val !== null && val !== undefined;
  }

  remove(key) {
    memoryCache.del(key);
  }

  clear() {
    memoryCache.clear();
  }
}

module.exports = new CacheService();