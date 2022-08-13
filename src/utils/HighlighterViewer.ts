/* eslint-disable @typescript-eslint/ban-ts-comment */
import localforage from 'localforage';
import { Epub, StatefulEpubViewer } from '@derock.ir/epubjs-plus';
import { UserWord, UserWordStatus } from '../../types/backend';

const FONT_SIZE_KEY = 'font-size';

export class HighlighterViewer extends StatefulEpubViewer {
  static updateWordStatus(vocab: HTMLElement, userWord: UserWord) {
    const instances = (vocab.getRootNode() as HTMLBodyElement).querySelectorAll(
      `vocab[word="${userWord.wordId}"]`
    );
    instances.forEach((item) => (item.className = userWord.status));
  }

  private readonly locationsForge = localforage.createInstance({
    name: 'locations',
  });

  private wordsMap = new Map<string, UserWordStatus>();

  constructor(book: Epub, userWords: UserWord[]) {
    super(book);
    userWords.forEach((item) => this.wordsMap.set(item.wordId, item.status));
  }

  public async initialize() {
    await super.initialize();
    const key = this.book.key();
    const locations = await this.locationsForge.getItem<any>(key);
    if (locations) {
      this.book.locations.load(locations);
    } else {
      // eslint-disable-next-line dot-notation
      // @ts-ignore
      const embededLocations = await this.book.archive['zip'].files[
        'locations.json'
      ]
        ?.async('string')
        .then(JSON.parse);
      if (embededLocations) {
        console.log(
          `Embeded locations (${embededLocations.length} records) found!`
        );
      }
      const locations =
        embededLocations ?? (await this.book.locations.generate(150));
      await this.locationsForge.setItem(key, locations);
    }
    this.on('content', this.registerEventListenersOfHighlights.bind(this));
    this.book.spine.hooks.content.register(this.hightlight.bind(this));
  }

  protected hightlight({ body }: Document) {
    this.emit('processing:start');
    const vocabs = body.querySelectorAll('vocab');
    vocabs.forEach((item) => {
      // @ts-ignore
      const word = item.textContent.toLowerCase();
      const status = this.wordsMap.get(word);
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

  protected registerEventListenersOfHighlights({ body }: Document) {
    // @ts-ignore
    body.querySelectorAll('vocab').forEach((element: HTMLSpanElement) => {
      element.onclick = (event: MouseEvent) => {
        this.emit('word-click', element);
        event.stopPropagation();
      };
    });
    // eslint-disable-next-line no-self-assign
    this.fontSize = this.fontSize;
  }

  protected registerThemes(override: any = {}) {
    const currentCFI = this.bookInfo.pagination.currentLocation?.end.cfi;
    this.rendition.themes.register('lamp-reader', { ...THEME, ...override });
    this.rendition.themes.select('lamp-reader');
    this.goTo(currentCFI as string);
  }

  // eslint-disable-next-line accessor-pairs
  public set fontSize(value: string) {
    this.registerThemes({
      '*': {
        'font-size': `${value}px !important`,
      },
    });
    localStorage.setItem(FONT_SIZE_KEY, value);
  }

  public get fontSize() {
    return localStorage.getItem(FONT_SIZE_KEY) || '24';
  }
}

const THEME = {
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
  },
  vocab: {
    cursor: 'pointer',
    'border-radius': '5px',
    // 'background-color': 'lightgrey',
    // padding: '0px 5px',
  },
  'vocab.KNOWN': {
    'background-color': 'lightgrey',
  },
  'vocab.LEARNING': {
    'background-color': 'orange',
    // color: 'white',
  },
  'vocab.UNKNOWN': {
    'background-color': 'black',
    color: 'white',
  },
  'a:hover': {
    color: 'unset',
  },
};
