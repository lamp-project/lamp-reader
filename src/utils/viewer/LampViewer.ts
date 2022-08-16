import { Epub, StatefulEpubViewer } from '@derock.ir/epubjs-plus';
import { localDatabase } from '@/utils/LocalDatabase';
import { UserWord, UserWordStatus } from '../../../types/backend';

const FONT_SIZE_KEY = 'font-size';

export class LampViewer extends StatefulEpubViewer {
  protected body!: HTMLBodyElement;

  private wordsMap = new Map<string, UserWordStatus>();

  constructor(book: Epub, userWords: UserWord[]) {
    super(book);
    userWords.forEach((item) => this.wordsMap.set(item.wordId, item.status));
  }

  public async initialize() {
    await super.initialize();
    await this.extractLocations();
    this.on('content', this.onContentLoaded.bind(this));
    this.book.spine.hooks.content.register(this.hightlight.bind(this));
  }

  private async extractLocations() {
    const key = this.book.key();
    const locations = await localDatabase.epubLocations.get(key);
    if (locations) {
      // @ts-ignore
      this.book.locations.load(locations);
    } else {
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
      await localDatabase.epubLocations.put(locations, key);
    }
  }

  protected hightlight({ body }: Document) {
    this.emit('processing:start');
    const vocabs = body.querySelectorAll('vocab');
    vocabs.forEach((item) => {
      // @ts-ignore
      const word = item.textContent.toLowerCase();
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

  protected onContentLoaded({ body }: Document) {
    this.body = body as HTMLBodyElement;
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
  public updateWordStatus({ wordId, status }: UserWord) {
    this.body.querySelectorAll(`vocab[word="${wordId}"]`).forEach((item) => {
      item.setAttribute('status', status);
      item.className = status;
    });
    this.wordsMap.set(wordId, status);
  }

  protected registerThemes(override: any = THEME) {
    this.rendition.themes.register('lamp-reader', { ...THEME, ...override });
    this.rendition.themes.select('lamp-reader');
  }

  public reloadLocation() {
    this.goTo(this.bookInfo.pagination.currentLocation?.end.cfi as string);
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
