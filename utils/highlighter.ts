function randomRgb() {
  const num = Math.round(0xffffff * Math.random());
  const r = num >> 16;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
export class Highlighter {
  constructor(protected readonly target: HTMLElement) {
    const textNodes = this.getTextNodes();
    // console.log(textNodes);
    textNodes.forEach(this.highlightTextNode.bind(this));
  }

  protected getTextNodes() {
    let n;
    const textNodes: Text[] = [];
    const walk = document.createTreeWalker(this.target, NodeFilter.SHOW_TEXT);
    while ((n = walk.nextNode())) textNodes.push(n);
    return textNodes;
  }

  protected highlightTextNode(target: Text) {
    if (!target.textContent) return;
    const parent = target.parentElement;
    if (!parent) return;
    switch (parent.nodeName.toLowerCase()) {
      case 'body':
      case 'a':
        break;
      default:
        {
          const span = document.createElement('span');
          span.innerHTML = target.textContent.replace(
            /and/g,
            `<span style="background-color: ${randomRgb()};padding: 3px;border-radius: 5px;">and</span>`
            // `<span>and</span>`
          );
          target.replaceWith(span);
        }
        break;
    }
  }
}
