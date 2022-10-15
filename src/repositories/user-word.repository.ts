import parseISO from 'date-fns/parseISO';
import { backend } from '@/utils/Backend';
import { ReviewInput, SyncUserWordsInput, UserWord } from 'types/backend';
import myUserWordsQuery from '@/graphql/queries/my-user-words.gql';
import reviewMutation from '@/graphql/mutations/review.gql';
import SyncUserWordsMutation from '@/graphql/mutations/sync-user-words.gql';

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

  async syncUserWords(userWords: ReviewInput[]) {
    return backend
      .mutate<{ input: SyncUserWordsInput }, { syncUserWords: UserWord[] }>(
        SyncUserWordsMutation,
        {
          input: { userWords },
        }
      )
      .then((data) => data.syncUserWords)
      .then((userWords) => userWords.map(parseUpdateAt));
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
