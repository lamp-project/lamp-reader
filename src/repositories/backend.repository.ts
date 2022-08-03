import { ApolloClientRepository } from './apollo.repository';

export class BackendRepository extends ApolloClientRepository {
  constructor() {
    super(`${process.env.VUE_API_URL}/graphql`);
  }
}
