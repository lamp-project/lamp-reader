import { ApolloClientRepository } from './apollo';

export class BackendRepository extends ApolloClientRepository {
  constructor() {
    super(`${process.env.VUE_API_URL}/graphql`);
  }
}
