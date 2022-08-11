import { backend } from '@/utils/Backend';
import { ReviewInput, UserWord } from 'types/backend';
import { localDatabase } from '@/utils/LocalDatabase';
import myUserWordsQuery from '@/graphql/queries/my-user-words.gql';
import reviewMutation from '@/graphql/mutations/review.gql';

export class UserWordRepository {
  async getMyUserWords() {
    if (await localDatabase.userWords.count()) {
      return localDatabase.userWords.toArray();
    } else {
      return backend
        .query<void, { myUserWords: UserWord[] }>(myUserWordsQuery)
        .then((res) => res.myUserWords)
        .then((userWords) =>
          Promise.all(
            userWords.map(async (item) => {
              await localDatabase.userWords.add(item);
              return item;
            })
          )
        );
    }
  }
  async review(input: ReviewInput) {
    return backend
      .mutate<{ input: ReviewInput }, { review: UserWord }>(reviewMutation, {
        input,
      })
      .then((data) => data.review)
      .then(async (userWord) => {
        await localDatabase.userWords.update(userWord.wordId, userWord)
        return userWord;
      });
  }
}

export const userWordRepository = new UserWordRepository();
