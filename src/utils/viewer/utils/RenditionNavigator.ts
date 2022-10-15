import { Rendition } from 'epubjs';

type Direction = 'rtl' | 'ltr';

export class RenditionNavigator {
  constructor(
    private readonly rendition: Rendition,
    private readonly direction: Direction
  ) {
    rendition.on('swipe:left', this.applyLeftEvent.bind(this));
    rendition.on('swipe:right', this.applyRightEvent.bind(this));
    // keybaord events
    rendition.on('keyup', this.listenKeyUpEvents.bind(this));
    document.addEventListener(
      'keyup',
      this.listenKeyUpEvents.bind(this),
      false
    );
  }

  private listenKeyUpEvents({ code }: KeyboardEvent) {
    // Left Key
    if (code === 'ArrowLeft') {
      this.applyRightEvent();
    }
    // Right Key
    if (code === 'ArrowRight') {
      this.applyLeftEvent();
    }
  }

  private applyRightEvent() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.direction === 'rtl' ? this.rendition.next() : this.rendition.prev();
  }

  private applyLeftEvent() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.direction === 'rtl' ? this.rendition.prev() : this.rendition.next();
  }
}
