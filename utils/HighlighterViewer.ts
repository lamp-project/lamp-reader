import { StatefulPaginatedEpubViewer } from '@lamp-project/epub-viewer';
import { StatefulVocabularyService } from '@lamp-project/vocabulary-service';
import { UserWordState } from '~/../vocabulary-service/src';

export const vocabularyService = new StatefulVocabularyService();

export class HighlighterViewer extends StatefulPaginatedEpubViewer {
  public static getTextNodes(root: Element) {
    const textNodes: Text[] = [];
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walk.nextNode())) textNodes.push(textNode);
    return textNodes;
  }

  public async initialize() {
    await super.initialize();
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
    body.querySelectorAll('.word').forEach((item: HTMLSpanElement) => {
      item.onclick = function () {
        vocabularyService.setWordState(item, UserWordState.learning);
      };
    });
  }

  protected highlightTextNode(node: Text) {
    node.replaceWith(vocabularyService.tag(node.textContent));
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
        'border-radius': '5px',
        // padding: '0px 5px',
      },
      '.word.known': {
        'background-color': 'lightgrey',
      },
      '.word.learning': {
        'background-color': 'green',
        color: 'white',
      },
      '.word.unknown': {
        'background-color': '#f44336',
        color: 'white',
      },
    });
    this.rendition.themes.select('lamp-reader');
  }
}
