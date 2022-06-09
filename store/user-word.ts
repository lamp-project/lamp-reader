import ReviewMutation from '@/graphql/mutations/review.gql';
import MyUserWordsQuery from '@/graphql/queries/my-user-words.gql';

export enum UserWordStatus {
  UNKNOWN = 'UNKNOWN',
  LEARNING = 'LEARNING',
  KNOWN = 'KNOWN',
}
export interface ReviewInput {
  word: string;
  status: UserWordStatus;
}

export interface UserWord {
  word: { id: number; word: string };
  status: UserWordStatus;
}
const LOCAL_STORAGE_KEY = 'user-words';

export const userWords = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
);

export const state = () => ({ userWords });

export const mutations = {
  upsertUserWord(state: any, userWord: UserWord) {
    state.userWords[userWord.word.word] = userWord.status;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.userWords));
  },
};

export const actions = {
  async review({ commit }: any, input: ReviewInput) {
    const client = this.app.apolloProvider.defaultClient;
    const userWord = await client
      .mutate({ mutation: ReviewMutation, variables: { input } })
      .then(({ data }) => data && data.review);
    commit('upsertUserWord', userWord);
    return userWord;
  },

  async getUserWords({ commit }: any) {
    const client = this.app.apolloProvider.defaultClient;
    const userWords = await client
      .query({ query: MyUserWordsQuery })
      .then(({ data }) => data && data.myUserWords);
    userWords.forEach((item) => commit('upsertUserWord', item));
  },
};
