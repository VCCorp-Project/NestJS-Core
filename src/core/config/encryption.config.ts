export default () => ({
  response: {
    encryption: process.env.RESPONSE_ENCRYPTION === 'true' ? true : false,
  },
});
