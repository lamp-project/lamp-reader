// db.ts
import Dexie, { Table } from 'dexie';
import { UserWord } from 'types/backend';
import { DictionaryEntry } from '@/repositories/dictionary.repository';

export class LocalDatabase extends Dexie {
  userWords!: Table<UserWord>;
  dictionary!: Table<DictionaryEntry>;

  constructor() {
    super('lamp-database');
    this.version(1).stores({
      userWords: 'wordId, status', // Primary key and indexed props
      dictionary: 'word', // Primary key and indexed props
    });
  }
}

export const localDatabase = new LocalDatabase();
