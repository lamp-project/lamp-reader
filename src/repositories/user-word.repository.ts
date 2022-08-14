import { backend } from '@/utils/Backend';
import { ReviewInput, UserWord } from 'types/backend';
import myUserWordsQuery from '@/graphql/queries/my-user-words.gql';
import reviewMutation from '@/graphql/mutations/review.gql';

export class UserWordRepository {
  async getUserWords() {
    return backend
      .query<void, { myUserWords: UserWord[] }>(myUserWordsQuery)
      .then(({ myUserWords }) => myUserWords);
  }

  async review(input: ReviewInput) {
    return backend
      .mutate<{ input: ReviewInput }, { review: UserWord }>(reviewMutation, {
        input,
      })
      .then((data) => data.review);
  }
}

export const userWordRepository = new UserWordRepository();
