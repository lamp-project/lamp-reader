const manifestOptions = require('./pwa.config');

process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  pwa: { manifestOptions },
  configureWebpack: {
    module: {
      rules: [{ test: /\.gql$/, use: 'graphql-tag/loader' }],
    },
  },
};
