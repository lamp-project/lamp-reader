import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${process.env.VUE_API_URL}/graphql`,
});