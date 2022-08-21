import parseISO from 'date-fns/parseISO';
import { backend } from '@/utils/Backend';
import { ReviewInput, UserWord } from 'types/backend';
import myUserWordsQuery from '@/graphql/queries/my-user-words.gql';
import reviewMutation from '@/graphql/mutations/review.gql';

function parseUpdateAt({ updatedAt, ...rest }: UserWord): UserWord {
  return {
    ...rest,
    updatedAt: parseISO(updatedAt),
  };
}

export class UserWordRepository {
  async getUserWords() {
    return backend
      .query<void, { myUserWords: UserWord[] }>(myUserWordsQuery)
      .then(({ myUserWords }) => myUserWords.map(parseUpdateAt));
  }

  async review(input: ReviewInput) {
    return backend
      .mutate<{ input: ReviewInput }, { review: UserWord }>(reviewMutation, {
        input,
      })
      .then((data) => data.review)
      .then(parseUpdateAt);
  }
}

export const userWordRepository = new UserWordRepository();
