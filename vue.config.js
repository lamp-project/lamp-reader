process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  configureWebpack: {
    module: {
      rules: [{ test: /\.gql$/, use: 'graphql-tag/loader' }],
    },
  },
};
