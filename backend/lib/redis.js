import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis instance with proper Upstash configuration

//import { createClient } from "redis"

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const redis = {
  get: (key) => redisClient.get(key),
  del: (key) => redisClient.del(key),
  set: (key, value, ...args) => {
    // If the 3rd argument is "EX", convert it to the Upstash object format
    if (args[0] === "ex") {
      return redisClient.set(key, value, { ex: args[1] });
    }
    return redisClient.set(key, value);
  },
};


export default redis;

