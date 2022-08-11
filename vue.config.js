module.exports = {
  pwa : {
    name: 'Lamp reader'
  },
  configureWebpack: {
    module: {
      rules: [{ test: /\.gql$/, use: 'graphql-tag/loader' }],
    },
  },
};
