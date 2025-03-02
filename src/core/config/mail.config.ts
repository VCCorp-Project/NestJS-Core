export default () => ({
  mail: {
    host: process.env.MAIL_HOST || '',
    username: process.env.MAIL_USERNAME || '',
    password: process.env.MAIL_PASSWORD || '',
  },
});
