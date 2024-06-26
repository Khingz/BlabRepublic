const redisClient = require("./redisClient")

const DEFAULT_EXPIRATION = 3600;

const handleCaching = async (key, cb) => {
    try {
        const data = await redisClient.get(key);
        if (data !== null) {
            return JSON.parse(data);
        }
        const newCache = await cb();
        await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(newCache));
        return newCache;
    } catch (error) {
        throw error;
    }
};

const deleteKeysByPrefix = async (prefix) => {
    try {
      const keys = [];
  
      // Inner function to recursively scan through all keys
      const scanAsync = async (cursor) => {
        // Perform a SCAN operation
        const scanResult = await redisClient.scan(cursor, {
          MATCH: `${prefix}*`,
          COUNT: 100
        });
  
        // Destructure the return value for clarity
        const nextCursor = scanResult.cursor;
        const foundKeys = scanResult.keys;
  
        // Check if foundKeys is an array before pushing
        if (Array.isArray(foundKeys)) {
          keys.push(...foundKeys);
        } else {
          // Handle unexpected data type (optional)
          console.log(`Unexpected data type from redisClient.scan: ${typeof foundKeys}`);
        }
  
        // If the next cursor is not 0, continue scanning
        if (nextCursor !== 0) {
          await scanAsync(nextCursor);
        }
      };
  
      // Start the scan with cursor '0'
      await scanAsync(0);
  
      // If any keys were found, delete them
      if (keys.length > 0) {
        await redisClient.del(keys);
        console.log(`Deleted ${keys.length} keys with prefix: ${prefix}`);
      } else {
        console.log(`No keys found with prefix: ${prefix}`);
      }
    } catch (error) {
      console.error('Error deleting keys by prefix:', error);
      throw error;
    }
  };

module.exports = {
    handleCaching,
    deleteKeysByPrefix
};