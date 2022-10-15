import { Contents } from 'epubjs';
import { UserWordStatus } from '../../../types/backend';
import { UserWord } from '../LocalDatabase';
import { EpubViewer } from './EpubViewer';

const FONT_SIZE_KEY = 'font-size';

export class LampViewer extends EpubViewer<
  'word-click' | 'processing:start' | 'processing:end'
> {
  protected body!: HTMLBodyElement;
  protected wordsMap = new Map<string, UserWordStatus>();

  constructor(file: ArrayBuffer, locations: string[] | undefined) {
    super(file, locations);
  }

  public async initialize(userWords: UserWord[]): Promise<void> {
    userWords?.forEach((item) => this.wordsMap.set(item.word, item.status));
    await super.initialize();
  }

  protected async onContentHook(contents: Contents): Promise<void> {
    await super.onContentHook(contents);
    this.body = contents.document.body as HTMLBodyElement;
    // @ts-ignore
    this.body.querySelectorAll('vocab').forEach((element: HTMLSpanElement) => {
      element.onclick = (event: MouseEvent) => {
        this.emit('word-click', element);
        event.stopPropagation();
      };
    });
    this.hightlight();
    // eslint-disable-next-line no-self-assign
    this.fontSize = this.fontSize;
  }

  protected hightlight() {
    this.emit('processing:start');
    const vocabs = this.body.querySelectorAll('vocab');
    vocabs.forEach((item) => {
      // @ts-ignore
      const word = item.getAttribute('word') as string;
      const status = this.wordsMap.get(word);
      item.setAttribute('status', status as string);
      switch (status) {
        case UserWordStatus.Known:
        case UserWordStatus.Learning:
          item.className = status.toUpperCase();
          break;
        default:
          item.className = 'UNKNOWN';
          break;
      }
    });
    this.emit('processing:end');
  }

  public updateWordStatus({ word, status }: UserWord) {
    this.body.querySelectorAll(`vocab[word="${word}"]`).forEach((item) => {
      item.setAttribute('status', status);
      item.className = status;
    });
    this.wordsMap.set(word, status);
  }

  protected registerThemes(override: any = THEME) {
    this.rendition.themes.register('lamp-reader', { ...THEME, ...override });
    this.rendition.themes.select('lamp-reader');
  }

  public reloadLocation() {
    this.goTo(this.location.end.cfi);
  }

  // eslint-disable-next-line accessor-pairs
  public set fontSize(value: string) {
    this.registerThemes({
      '*': { 'font-size': `${value}px !important` },
    });
    localStorage.setItem(FONT_SIZE_KEY, value);
  }

  public get fontSize() {
    return localStorage.getItem(FONT_SIZE_KEY) || '24';
  }
}

const THEME = {
  // '@font-face': {
  //   'font-family': 'Merriweather',
  //   'font-style': `normal`,
  //   'font-weight': 300,
  //   src: `url('/fonts/merriweather-v30-latin-300.eot') /* IE9 Compat Modes */,
  //        url('/fonts/merriweather-v30-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  //        url('/fonts/merriweather-v30-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
  //        url('/fonts/merriweather-v30-latin-300.woff') format('woff'), /* Modern Browsers */
  //        url('/fonts/merriweather-v30-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
  //        url('/fonts/merriweather-v30-latin-300.svg#Merriweather') format('svg') /* Legacy iOS */`,
  // },
  body: {
    color: 'black',
    'padding-top': '0 !important',
    'padding-bottom': '0 !important',
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
    'font-family': 'serif !important',
  },
  p: {
    'text-indent': '1em',
  },
  vocab: {
    cursor: 'pointer',
    'border-radius': '5px',
    // 'background-color': 'lightgrey',
    // padding: '0px 5px',
  },
  'vocab.KNOWN': {
    'border-bottom': `1px dashed lightgrey`,
    'border-radius': '0px',
    // 'background-color': 'lightgrey',
  },
  'vocab.LEARNING': {
    'background-color': 'orange',
    // color: 'white',
    // 'border-bottom': `2px solid orange`,
  },
  'vocab.UNKNOWN': {
    // 'border-bottom': `2px solid red`,
    'background-color': 'black',
    color: 'white',
  },
  'a:hover': {
    color: 'unset',
  },
};
