import { ref } from 'vue';
import { Mutex } from 'async-mutex';
import { ReviewInput } from 'types/backend';
import { localDatabase, UserWord } from '@/utils/LocalDatabase';
import { userWordRepository } from '@/repositories/user-word.repository';
import { omit } from 'lodash';
import { Loading } from '@/utils/Loading';

export class UserWordStore {
  private readonly initialising = new Mutex();
  public readonly userWords = ref<UserWord[]>([]);

  async initialise(): Promise<UserWord[]> {
    const release = await this.initialising.acquire();
    try {
      if (this.userWords.value.length > 0) {
        return this.userWords.value;
      } else {
        this.userWords.value = await localDatabase.userWords.toArray();
        return this.userWords.value;
      }
    } finally {
      release();
    }
  }

  public async syncUserWords() {
    await Loading.wait(
      'Syncing Words ...',
      async () => {
        const notSyncedUserWords = await localDatabase.userWords
          .filter((item) => !item.synced)
          .toArray();
        const userWords = await userWordRepository
          .syncUserWords(
            notSyncedUserWords.map((item) =>
              omit(item, ['synced', 'createdAt'])
            )
          )
          .then((res) =>
            res.map((item) => ({
              ...omit(item, '__typename'),
              synced: true,
            }))
          );
        await localDatabase.userWords.clear();
        await localDatabase.userWords.bulkAdd(userWords);
        this.userWords.value = userWords;
      },
      'UserWords successfully synced.'
    );
  }

  async review(input: ReviewInput) {
    const userWord: UserWord = { updatedAt: new Date(), ...input };
    await localDatabase.userWords.put(userWord);
    this.userWords.value = await localDatabase.userWords.toArray();
    return userWord;
  }
}

export const userWordStore = new UserWordStore();
