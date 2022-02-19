import { StatefulPaginatedEpubViewer } from '@lamp-project/epub-viewer';

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
    textNodes.forEach(this.highlightTextNode.bind(this));
  }

  protected registerEventListenersOfHighlights({ body }: Document) {
    body.querySelectorAll('.word').forEach((item: HTMLSpanElement) => {
      item.onclick = function () {
        console.log(this);
      };
    });
  }

  private highlightTextNode(node: Text) {
    if (!node.textContent) return;
    const parent = node.parentElement;
    switch (parent.nodeName.toLowerCase()) {
      case 'body':
      case 'a':
        break;
      default:
        {
          const span = document.createElement('span');
          span.innerHTML = node.textContent.replace(
            /and/g,
            `<span style="background-color: orange;padding: 3px;border-radius: 5px;" class="word">and</span>`
            // `<span>and</span>`
          );
          node.replaceWith(span);
        }
        break;
    }
  }
}
