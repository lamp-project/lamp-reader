// db.ts
import Dexie, { Table } from 'dexie';
import { UserWord } from 'types/backend';
import { DictionaryEntry } from '@/repositories/dictionary.repository';
import { LibraryItem } from '@/store/library.store';

export class LocalDatabase extends Dexie {
  userWords!: Table<UserWord>;
  dictionary!: Table<DictionaryEntry>;
  epubLocations!: Table<string[]>;
  epubFiles!: Table<ArrayBuffer>;
  libraryItems!: Table<LibraryItem>;
  settings!: Table<any>;

  constructor() {
    super('lamp-database');
    this.version(1).stores({
      userWords: 'wordId, status', // Primary key and indexed props
      dictionary: 'word', // Primary key and indexed props
      epubLocations: '',
      epubFiles: '',
      libraryItems: 'id',
      settings: '',
    });
  }
}

export const localDatabase = new LocalDatabase();
