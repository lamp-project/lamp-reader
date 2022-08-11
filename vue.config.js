const pwa = require('./pwa.config');

module.exports = {
  pwa,
  configureWebpack: {
    module: {
      rules: [{ test: /\.gql$/, use: 'graphql-tag/loader' }],
    },
  },
};
