import { backend } from '@/utils/Backend';
import { ReviewInput, UserWord, UserWordStatus } from 'types/backend';
import { localDatabase } from '@/utils/LocalDatabase';
import myUserWordsQuery from '@/graphql/queries/my-user-words.gql';
import reviewMutation from '@/graphql/mutations/review.gql';
import { EventEmitter } from 'eventemitter3';

function filterUserWordsByStatus(
  userWords: UserWord[],
  status?: UserWordStatus
) {
  if (status) {
    return userWords.filter((item) => item.status == status);
  } else {
    return userWords;
  }
}

export class UserWordRepository extends EventEmitter {
  async getUserWords() {
    await localDatabase.userWords.clear();
    const userWords = await backend
      .query<void, { myUserWords: UserWord[] }>(myUserWordsQuery)
      .then(({ myUserWords }) =>
        Promise.all(
          myUserWords.map(async (userWord) => {
            await localDatabase.userWords.put(userWord);
            return userWord;
          })
        )
      );
    this.emit('updated', userWords);
    return userWords;
  }
  async getLocalUserWords(status?: UserWordStatus) {
    if (await localDatabase.userWords.count()) {
      return filterUserWordsByStatus(
        await localDatabase.userWords.toArray(),
        status
      );
    } else {
      return this.getUserWords().then((userWords) =>
        filterUserWordsByStatus(userWords, status)
      );
    }
  }

  async review(input: ReviewInput) {
    const userWord = await backend
      .mutate<{ input: ReviewInput }, { review: UserWord }>(reviewMutation, {
        input,
      })
      .then((data) => data.review)
      .then(async (userWord) => {
        await localDatabase.userWords.update(userWord.wordId, userWord);
        return userWord;
      });
    this.emit('updated', [userWord]);
    return userWord;
  }
}

export const userWordRepository = new UserWordRepository();
