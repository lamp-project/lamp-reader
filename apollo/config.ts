import { onError } from 'apollo-link-error';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ redirect }) => {
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors?.length > 0) {
      //  && graphQLErrors[0]
      if (
        graphQLErrors.reduce((result, error) => {
          return result || error.message === 'Unauthorized';
        }, false)
      ) {
        redirect('login');
      }
    }
  });
  return {
    link: errorLink,
    httpEndpoint: `${process.env.API_URL}/graphql`,
  };
};
