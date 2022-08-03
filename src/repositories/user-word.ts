export enum UserWordStatus {
  UNKNOWN = 'UNKNOWN',
  LEARNING = 'LEARNING',
  KNOWN = 'KNOWN',
}
export interface ReviewInput {
  word: string;
  status: UserWordStatus;
}

export interface UserWord {
  word: { id: number; word: string };
  status: UserWordStatus;
}
const LOCAL_STORAGE_KEY = 'user-words';

export const userWords = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
);

export class UserWordRepository {
  
}