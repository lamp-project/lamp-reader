// db.ts
import Dexie, { Table } from 'dexie';
import { UserWord } from 'types/backend';

export class LocalDatabase extends Dexie {
  userWords!: Table<UserWord>; 

  constructor() {
    super('lamp-database');
    this.version(1).stores({
      userWords: 'wordId, status, word' // Primary key and indexed props
    });
  }
}

export const localDatabase = new LocalDatabase();