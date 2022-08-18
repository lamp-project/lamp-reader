import { ref } from 'vue';
import { Mutex } from 'async-mutex';
import { ReviewInput, UserWord } from 'types/backend';
import { userWordRepository } from '@/repositories/user-word.repository';
import { localDatabase } from '@/utils/LocalDatabase';

export class UserWordStore {
  private readonly initialising = new Mutex();
  public readonly userWords = ref<UserWord[]>([]);

  async initialise(): Promise<UserWord[]> {
    const release = await this.initialising.acquire();
    try {
      if (this.userWords.value.length > 0) {
        return this.userWords.value;
      } else {
        return await this.getUserWords();
      }
    } finally {
      release();
    }
  }

  public async getUserWords() {
    if (await localDatabase.userWords.count()) {
      const userWords = await localDatabase.userWords.toArray();
      this.userWords.value = userWords;
      return userWords;
    } else {
      return this.syncUserWords();
    }
  }

  public async syncUserWords() {
    await localDatabase.userWords.clear();
    const userWords = await userWordRepository.getUserWords();
    await localDatabase.userWords.bulkAdd(userWords);
    this.userWords.value = userWords;
    return userWords;
  }

  async review(input: ReviewInput) {
    const userWord = await userWordRepository.review(input);
    await localDatabase.userWords.update(userWord.wordId, userWord);
    this.userWords.value = await localDatabase.userWords.toArray();
    return userWord;
  }
}

export const userWordStore = new UserWordStore();
