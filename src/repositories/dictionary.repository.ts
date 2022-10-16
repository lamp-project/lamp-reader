import { app } from '@/main';
import { DictionaryEntry, localDatabase } from '@/utils/LocalDatabase';
import { Mutex } from 'async-mutex';
import { groupBy } from 'lodash';
export class DictionaryRepository {
  private readonly initialising = new Mutex();

  async initialise(): Promise<void> {
    const release = await this.initialising.acquire();
    try {
      const dictionaryEntries = await localDatabase.dictionary.count();
      if (dictionaryEntries == 0) {
        await app.config.globalProperties.dictionaryImporter.import();
      }
    } finally {
      release();
    }
  }

  async downloadDictionary() {
    const definitions = await fetch(
      `${process.env.VUE_APP_BASE_URL}/dic/definitions.tsv`
    )
      .then((res) => res.text())
      .then((res) => res.split('\n').map((line) => line.split('\t')))
      .then((items) => groupBy(items, '0'));
    const entries = await fetch(
      `${process.env.VUE_APP_BASE_URL}/dic/entries.tsv`
    )
      .then((res) => res.text())
      .then((res) => res.split('\n').map((line) => line.split('\t')));
    return { definitions, entries };
  }

  async lookup(word: string): Promise<DictionaryEntry> {
    const entry = await localDatabase.dictionary.get(word);
    if (entry) {
      return entry;
    } else {
      return { word, rank: -1, ratio: 0, definitions: {} };
    }
  }
}

export const dictionaryRepository = new DictionaryRepository();

// @ts-ignore
window.dictionaryRepository = dictionaryRepository;
