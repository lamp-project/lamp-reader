// const blackList = ['i', 'am', 'are', 'is', 'he', 'she', 'we', 'you'];

export enum UserWordState {
  known = 'known',
  unknown = 'unknown',
  learning = 'learning',
}

export interface UserWord {
  word: string;
  state: UserWordState;
}

export class VocabularyTagger {
  // eslint-disable-next-line no-useless-constructor
  constructor(protected readonly userVocabulary: UserWord[] = []) {}
  public tag(text: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.innerHTML = text;
    return span;
  }
}
