/* eslint-disable no-console */
import listenRenditionGestureEvents from './listenRenditionGestures';
import { EpubViewerBase } from './EpubViewerBase';

export class EpubViewer extends EpubViewerBase {
  constructor(protected input: ArrayBuffer) {
    super();
  }

  public async initialize() {
    await super.initialize(this.input);
    delete this.input;
  }

  protected registerEventListeners() {
    super.registerEventListeners();
    // gestures events
    listenRenditionGestureEvents(this.rendition);
    this.rendition.on('swipe:left', this.applyLeftEvent.bind(this));
    this.rendition.on('swipe:right', this.applyRightEvent.bind(this));
    // keybaord events
    this.rendition.on('keyup', this.listenKeyUpEvents.bind(this));
    document.addEventListener(
      'keyup',
      this.listenKeyUpEvents.bind(this),
      false
    );
    // mouse events
    this.rendition.on('click', () => this.emit('click-tap'));
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
    // @ts-ignore
    this.book.packaging?.metadata?.direction === 'rtl'
      ? this.rendition.next()
      : this.rendition.prev();
  }

  private applyLeftEvent() {
    // @ts-ignore
    this.book.packaging?.metadata?.direction === 'rtl'
      ? this.rendition.prev()
      : this.rendition.next();
  }
}
