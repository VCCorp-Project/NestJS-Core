export default () => ({
  database: {
    mysql: {
      host: process.env.MYSQL_HOST || 'XXX',
      port: process.env.MYSQL_PORT || 'XXX',
      username: process.env.MYSQL_USERNAME || 'XXX',
      password: process.env.MYSQL_PASSWORD,
      db: process.env.MYSQL_DATABASE || 'XXX',
    },
  },
});
