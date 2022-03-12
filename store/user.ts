import Login from '@/graphql/mutations/Login.gql';

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
      .mutate({ mutation: Login, variables: { input } })
      .then(({ data }) => data && data.login);
    await this.$apolloHelpers.onLogin(jwt);
    commit('setUser', user);
  },
};
