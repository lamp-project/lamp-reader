import { UserWordStatus } from '@lamp-project/vocabulary-service';
import ReviewMutation from '@/graphql/mutations/review.gql';
import MyUserWordsQuery from '@/graphql/queries/my-user-words.gql';

export interface ReviewInput {
  word: string;
  status: UserWordStatus;
}

export interface UserWord {
  id: number;
  word: { id: number; word: string };
  status: UserWordStatus;
}

export const state = () => ({
  user: JSON.parse(localStorage.getItem('user')),
});

export const mutations = {
  // updateUserWord(state: any, user: any) {
  //   state.user = user;
  //   localStorage.setItem('user', JSON.stringify(user));
  // },
};

export const actions = {
  async review({ commit }: any, input: ReviewInput) {
    const client = this.app.apolloProvider.defaultClient;
    const userWord = await client
      .mutate({ mutation: ReviewMutation, variables: { input } })
      .then(({ data }) => data && data.review);
    commit('updateUserWord', userWord);
  },
  async getUserWords() {
    const client = this.app.apolloProvider.defaultClient;
    const myUserWords = await client
      .query({ query: MyUserWordsQuery })
      .then(({ data }) => data && data.myUserWords);
    return myUserWords;
  },
};
