import { Redis } from 'ioredis';
import { config } from '../config/config.js';

const globalForRedis = globalThis as unknown as { redis: Redis | undefined };

export const redisClient = globalForRedis.redis ?? new Redis(config.redis.REDIS_DATABASE_URL);

globalForRedis.redis = redisClient;
