import { backend } from '@/utils/Backend';
import { UserWord } from 'types/backend';
import { localDatabase } from '@/utils/LocalDatabase';
import myUserWordsQuery from '@/graphql/queries/my-user-words.gql';

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
}

export const userWordRepository = new UserWordRepository();
