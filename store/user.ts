import SignupMutation from '@/graphql/mutations/signup.gql';
import LoginMutation from '@/graphql/mutations/login.gql';

export const state = () => ({
  user: JSON.parse(localStorage.getItem('user')),
});

export const mutations = {
  setUser(state: any, user: any) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
};

export const actions = {
  async login({ commit }: any, input: any) {
    const client = this.app.apolloProvider.defaultClient;
    const { jwt, user } = await client
      .mutate({ mutation: LoginMutation, variables: { input } })
      .then(({ data }) => data && data.login);
    await this.$apolloHelpers.onLogin(jwt);
    commit('setUser', user);
  },
  async signup({ commit }: any, input: any) {
    const client = this.app.apolloProvider.defaultClient;
    const { jwt, user } = await client
      .mutate({ mutation: SignupMutation, variables: { input } })
      .then(({ data }) => data && data.signup);
    await this.$apolloHelpers.onLogin(jwt);
    commit('setUser', user);
  },
  async logout({ commit }: any) {
    commit('setUser', null);
    this.$apolloHelpers.onLogout();
    localStorage.clear();
    // @ts-ignore
    const databases = await indexedDB.databases();
    return Promise.all(
      databases.map((database) => indexedDB.deleteDatabase(database.name))
    );
  },
};
