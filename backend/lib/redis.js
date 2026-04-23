import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Load .env locally only (Vercel injects env vars in production)
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  dotenv.config();
}

const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;

if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
  console.warn(
    "Warning: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is not set. " +
    "Set them in your environment (.env for local, Vercel project settings for production)."
  );
}

const client = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

// Small wrapper API:
// - get(key) => returns value or null
// - del(key)
// - set(key, value, ttlSeconds?) => if ttlSeconds provided, uses EX
// - getJSON / setJSON for storing JSON objects
export const redis = {
  async get(key) {
    return await client.get(key);
  },

  async del(key) {
    return await client.del(key);
  },

  async set(key, value, ttlSeconds) {
    if (typeof ttlSeconds === "number") {
      return await client.set(key, value, { ex: ttlSeconds });
    }
    return await client.set(key, value);
  },

  async getJSON(key) {
    const v = await client.get(key);
    return v == null ? null : JSON.parse(v);
  },

  async setJSON(key, obj, ttlSeconds) {
    return await this.set(key, JSON.stringify(obj), ttlSeconds);
  },

  // raw client in case you need other commands
  client,
};

export default redis;