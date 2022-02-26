import { StatefulPaginatedEpubViewer } from '@lamp-project/epub-viewer';
import { VocabularyTagger } from './VocabulareyTagger';
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
        console.log(this);
      };
    });
  }

  protected highlightTextNode(node: Text) {
    node.replaceWith(new VocabularyTagger().tag(node.textContent));
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
        'background-color': 'orangered',
        color: 'white',
      },
    });
    this.rendition.themes.select('lamp-reader');
  }
}
