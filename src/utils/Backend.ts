import { GraphqlClient } from './GraphqlClient';
import {
  LoginInput,
  MutationLoginArgs,
  LoginResponse,
  User,
  MutationSignupArgs,
  SignupInput,
} from 'types/backend';
import loginMutation from '@/graphql/mutations/login.gql';
import signupMutation from '@/graphql/mutations/signup.gql';
import { localDatabase } from './LocalDatabase';

const AUTH_TOKEN_STORAGE_KEY = 'token';
const AUTHENTICATED_USER_STORAGE_KEY = 'user';

export class Backend extends GraphqlClient {
  constructor() {
    super(`${process.env.VUE_APP_API_URL}/graphql`);
    this.authToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  private set authToken(value: string | null) {
    if (value) {
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, value);
      this.headers.Authorization = `Bearer ${value}`;
    } else {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      localStorage.removeItem(AUTHENTICATED_USER_STORAGE_KEY);
      delete this.headers.Authorization;
    }
  }

  get authenticatedUser(): User | null {
    return JSON.parse(
      localStorage.getItem(AUTHENTICATED_USER_STORAGE_KEY) || 'null'
    );
  }

  private set authenticatedUser(value: User | null) {
    localStorage.setItem(AUTHENTICATED_USER_STORAGE_KEY, JSON.stringify(value));
  }

  async login(input: LoginInput) {
    return this.mutate<MutationLoginArgs, { login: LoginResponse }>(
      loginMutation,
      { input }
    )
      .then((data) => data?.login)
      .then(({ jwt, user }) => {
        this.authToken = jwt;
        this.authenticatedUser = user;
        return user;
      });
  }

  async signup(input: SignupInput) {
    return this.mutate<MutationSignupArgs, { signup: LoginResponse }>(
      signupMutation,
      { input }
    )
      .then((data) => data?.signup)
      .then(({ jwt, user }) => {
        this.authToken = jwt;
        this.authenticatedUser = user;
        return user;
      });
  }

  async signOut() {
    this.authToken = null;
    await localDatabase.delete();
    await indexedDB.databases().then((databases) => {
      databases.forEach((db) => {
        if (db.name) {
          indexedDB.deleteDatabase(db.name);
        }
      });
    });
    localStorage.clear();
  }
}

export const backend = new Backend();
