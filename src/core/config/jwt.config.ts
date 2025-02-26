export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || '',
    ttl: process.env.JWT_TTL || '40s',
    refresh_ttl: process.env.JWT_REFRESH_TTL || '60s',
    rounds: 10,
  },
});
