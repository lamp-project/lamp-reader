import { BackendRepository } from './backend.repository';
import { LoginInput, MutationLoginArgs, LoginResponse } from 'types/backend';
import loginMutation from '@/graphql/mutations/login.gql';

export class UserRepository extends BackendRepository {
  async login(input: LoginInput) {
    return this.mutate<MutationLoginArgs, { login: LoginResponse }>(
      loginMutation,
      { input }
    ).then((data) => data?.login);
  }
}

export const userRepository = new UserRepository();
