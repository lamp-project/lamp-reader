module.exports = {
  configureWebpack: {
    module: {
      rules: [{ test: /\.gql$/, use: 'graphql-tag/loader' }],
    },
  },
};
