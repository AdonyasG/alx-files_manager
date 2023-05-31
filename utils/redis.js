import { createClient, print } from 'redis';

const util = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.clientConnect = true;
    this.client.on('error', (error) => {
      console.log(error);
      this.clientConnect = false;
    });
  }

  isAlive() {
    return this.clientConnect;
  }

  async get(key) {
    const getAsync = util.promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
