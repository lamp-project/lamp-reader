const manifestOptions = require('./pwa.config');

module.exports = {
  pwa: { manifestOptions },
  configureWebpack: {
    module: {
      rules: [{ test: /\.gql$/, use: 'graphql-tag/loader' }],
    },
  },
};
