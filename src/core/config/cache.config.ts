export default () => ({
  cache: {
    ttl: process.env.CACHE_DEFAULT_TTL || 300,

    redis: {
      host: process.env.CACHE_REDIS_HOST || '127.0.0.1',
      port: process.env.CACHE_REDIS_PORT || '6379',
      db: process.env.CACHE_REDIS_DB || '0',
      prefix: 'redis_cache',
    },
  },
});
