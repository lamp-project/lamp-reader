const manifestOptions = require('./pwa.config');

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  pwa: { manifestOptions },
  configureWebpack: {
    module: {
      rules: [{ test: /\.gql$/, use: 'graphql-tag/loader' }],
    },
  },
};
