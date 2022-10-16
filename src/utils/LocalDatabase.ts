// db.ts
import Dexie, { Table } from 'dexie';
import { LibraryItem } from '@/store/library.store';
import { UserWordStatus } from 'types/backend';
export interface UserWord {
  createdAt?: Date;
  updatedAt: Date;
  word: string;
  status: UserWordStatus;
  synced?: boolean;
}

export interface DictionaryEntry {
  word: string;
  rank: number;
  ratio: number;
  definitions: { [POS: string]: string[] };
}

export class LocalDatabase extends Dexie {
  userWords!: Table<UserWord>;
  dictionary!: Table<DictionaryEntry>;
  epubLocations!: Table<string[]>;
  epubFiles!: Table<ArrayBuffer>;
  libraryItems!: Table<LibraryItem>;

  constructor() {
    super('lamp-database');
    this.version(1).stores({
      userWords: 'word, status', // Primary key and indexed props
      dictionary: 'word', // Primary key and indexed props
      epubLocations: '',
      epubFiles: '',
      libraryItems: 'id',
    });
  }

  async clearAll() {
    await this.userWords.clear();
    await this.dictionary.clear();
    await this.epubFiles.clear();
    await this.epubLocations.clear();
    await this.libraryItems.clear();
  }
}

export const localDatabase = new LocalDatabase();

// @ts-ignore
window.localDatabase = localDatabase;
