const redis = require('redis');

// Use the Redis URLs
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Create a Redis client
const redisClient = redis.createClient({url: REDIS_URL});

redisClient.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.log(err.message);
})

module.exports = redisClient;