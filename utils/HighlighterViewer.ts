import localforage from 'localforage';
import { Epub, StatefulEpubViewer } from '@derock.ir/epubjs-plus';
import { UserWord, UserWordStatus } from '~/store/user-word';

export class HighlighterViewer extends StatefulEpubViewer {
  static updateWordStatus(vocab: HTMLElement, userWord: UserWord) {
    const instances = (vocab.getRootNode() as HTMLBodyElement).querySelectorAll(
      `vocab[word="${userWord.word.word}"]`
    );
    instances.forEach((item) => (item.className = userWord.status));
  }

  private readonly locationsForge = localforage.createInstance({
    name: 'locations',
  });

  constructor(
    book: Epub,
    protected readonly userWords: { [key: string]: UserWordStatus }
  ) {
    super(book);
    if (!localStorage.getItem('font-size')) {
      localStorage.setItem('font-size', '24');
    }
  }

  public async initialize() {
    await super.initialize();
    const key = this.book.key();
    const locations = await this.locationsForge.getItem<any>(key);
    if (locations) {
      this.book.locations.load(locations);
    } else {
      const locations = await this.book.locations.generate(10);
      await this.locationsForge.setItem(key, locations);
    }
    this.on('content', this.registerEventListenersOfHighlights.bind(this));
    this.book.spine.hooks.content.register(this.hightlight.bind(this));
  }

  protected hightlight({ body }: Document) {
    this.emit('processing:start');
    const vocabs = body.querySelectorAll('vocab');
    vocabs.forEach((item) => {
      const word = item.textContent.toLowerCase();
      switch (this.userWords[word]) {
        case UserWordStatus.KNOWN:
        case UserWordStatus.LEARNING:
          item.className = this.userWords[word];
          break;
        default:
          item.className = UserWordStatus.UNKNOWN;
          break;
      }
    });
    this.emit('processing:end');
  }

  protected registerEventListenersOfHighlights({ body }: Document) {
    body.querySelectorAll('vocab').forEach((element: HTMLSpanElement) => {
      element.onclick = (event: MouseEvent) => {
        this.emit('word-click', element);
        event.stopPropagation();
      };
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected highlightTextNode(node: Text) {
    // node.replaceWith(vocabularyService.tag(node.textContent, this.userWords));
  }

  protected registerThemes() {
    this.rendition.themes.register('lamp-reader', {
      '*': {
        'font-size': `${localStorage.getItem('font-size')}px !important`,
      },
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
    });
    this.rendition.themes.select('lamp-reader');
  }

  // eslint-disable-next-line accessor-pairs
  public set fontSize(value: string) {
    this.rendition.themes.default({
      '*': {
        'font-size': `${value}px !important`,
      },
    });
    localStorage.setItem('font-size', value);
  }
}
