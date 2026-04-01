import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis instance with proper Upstash configuration
const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

// Wrap Upstash Redis methods to be compatible with ioredis API
export const redis = {
  get: async (key) => {
    return await redisClient.get(key);
  },
  set: async (key, value, ...args) => {
    // Handle ioredis-style set with expiry: set(key, value, 'EX', seconds)
    if (args.length >= 2 && args[0] === 'EX') {
      const expirySeconds = args[1];
      await redisClient.set(key, value);
      await redisClient.expire(key, expirySeconds);
    } else {
      await redisClient.set(key, value);
    }
  },
  del: async (key) => {
    return await redisClient.del(key);
  },
  // Add any other methods as needed
};

export default redis;

