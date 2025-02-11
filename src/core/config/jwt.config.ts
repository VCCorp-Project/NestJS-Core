export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || '',
    ttl: process.env.JWT_TTL || '1d',
    rounds: 10,
  },
});
