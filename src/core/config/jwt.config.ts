export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || '',
    ttl: process.env.JWT_TTL || '1d',
    refresh_ttl: process.env.JWT_REFRESH_TTL || '7d',
    rounds: 10,
  },
});
