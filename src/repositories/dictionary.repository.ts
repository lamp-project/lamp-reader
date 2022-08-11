// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lookup } from '@derock.ir/dictionary-client';
import { localDatabase } from '@/utils/LocalDatabase';

export interface DictionaryEntryRecordMeaningDefinition {
  antonyms: string[];
  synonyms: string[];
  definition: string;
  example: string;
}

export interface DictionaryEntryRecordMeaning {
  partOfSpeech: 'verb' | 'noun' | 'adjective';
  antonyms: string[];
  synonyms: string[];
  definitions: DictionaryEntryRecordMeaningDefinition[];
}

export interface DictionaryEntryRecordPhonetic {
  text: string;
  audio: string;
}

export interface DictionaryEntryRecord {
  phonetic: string;
  phonetics: DictionaryEntryRecordPhonetic[];
  meanings: DictionaryEntryRecordMeaning[];
  sourceUrls: string[];
}

export interface DictionaryEntry {
  word: string;
  rank: number;
  occurrence: number;
  records: DictionaryEntryRecord[];
}

export class DictionaryRepository {
  async lookup(word: string): Promise<DictionaryEntry> {
    const entry = await localDatabase.dictionary.get(word);
    if (entry) {
      return entry;
    } else {
      return lookup(word).then(async (res: DictionaryEntry) => {
        await localDatabase.dictionary.add(res);
        return res;
      });
    }
  }
}

export const dictionaryRepository = new DictionaryRepository();
