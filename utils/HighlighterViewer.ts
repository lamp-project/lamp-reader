import { StatefulPaginatedEpubViewer } from '@lamp-project/epub-viewer';
import {
  VocabularyService,
  UserWordStatus,
} from '@lamp-project/vocabulary-service';
import { UserWord } from '~/store/user-word';

export const vocabularyService = new VocabularyService();

export class HighlighterViewer extends StatefulPaginatedEpubViewer {
  protected userWords: { [key: string]: UserWordStatus } = {};
  public static getTextNodes(root: Element) {
    const textNodes: Text[] = [];
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walk.nextNode())) textNodes.push(textNode);
    return textNodes;
  }

  public async initialize(userWords?: UserWord[]) {
    await super.initialize();
    userWords?.forEach((item) => {
      this.userWords[item.word.word] = item.status;
    });
    this.book.spine.hooks.content.register(this.hightlight.bind(this));
    this.on('content', this.registerEventListenersOfHighlights.bind(this));
  }

  protected hightlight({ body }: Document) {
    const textNodes = HighlighterViewer.getTextNodes(body);
    textNodes.forEach((node) => {
      if (!node.textContent) return;
      switch (node.parentElement.nodeName.toLowerCase()) {
        case 'body':
        case 'a':
          break;
        default:
          this.highlightTextNode(node);
          break;
      }
    });
  }

  protected registerEventListenersOfHighlights({ body }: Document) {
    body.querySelectorAll('.word').forEach((element: HTMLSpanElement) => {
      element.onclick = (event: MouseEvent) => {
        this.emit('word-click', element);
        event.stopPropagation();
      };
    });
  }

  protected highlightTextNode(node: Text) {
    node.replaceWith(vocabularyService.tag(node.textContent, this.userWords));
  }

  protected tokenise(text: string) {
    return text.split(' ');
  }

  protected registerThemes() {
    this.rendition.themes.register('lamp-reader', {
      body: {
        color: 'black',
        'font-size': 'x-large',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important',
      },
      '.word': {
        cursor: 'pointer',
        'border-radius': '5px',
        // padding: '0px 5px',
      },
      '.word.KNOWN': {
        // 'background-color': 'lightgrey',
      },
      '.word.LEARNING': {
        'background-color': 'lightgrey',
        // color: 'white',
      },
      '.word.UNKNOWN': {
        'background-color': 'black',
        color: 'white',
      },
    });
    this.rendition.themes.select('lamp-reader');
  }
}
