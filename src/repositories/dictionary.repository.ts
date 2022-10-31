import { app } from '@/main';
import { DictionaryEntry, localDatabase } from '@/utils/LocalDatabase';
import { Mutex } from 'async-mutex';
import { groupBy } from 'lodash';
import * as YAML from 'yaml';
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

  async lookupPersianDefintion(word: string): Promise<string> {
    const entry = await localDatabase.dictionary.get(word);
    if (entry?.persianDefinition) {
      return entry.persianDefinition;
    } else {
      try {
        const path = word.split('').splice(0, 2).join('/');
        const persianDefinition = await fetch(
          `https://raw.githubusercontent.com/open-dictionary/english-dictionary/master/${path}/${word}/definitions.fa.yaml`
        )
          .then((res) => res.text())
          .then(YAML.parse)
          .then((definitions) =>
            definitions.map(({ definition }: any) => definition).join(', ')
          );
        await localDatabase.dictionary.update(word, { persianDefinition });
        return persianDefinition;
      } catch (error) {
        return '';
      }
    }
  }
}

export const dictionaryRepository = new DictionaryRepository();

// @ts-ignore
window.dictionaryRepository = dictionaryRepository;
