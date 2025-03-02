export default () => ({
  queue: {
    redis: {
      host: process.env.QUEUE_REDIS_HOST || '127.0.0.1',
      port: process.env.QUEUE_REDIS_PORT || '6379',
      db: process.env.QUEUE_REDIS_DB || '1',
    },
  },
});
