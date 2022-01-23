/* eslint-disable no-console */
import EventEmitter from 'eventemitter3';
import Epub, { Contents, Rendition } from 'epubjs';
import { RenditionOptions, Location } from 'epubjs/types/rendition';

export interface RelocatedEventPayload {
  location: Location;
  chapter?: string;
}

export class EpubViewerBase extends EventEmitter {
  protected element: Element;
  protected rendition: Rendition;
  protected currentLocation: string;
  protected currentChapter: string;
  constructor(protected readonly book = Epub()) {
    super();
  }

  public get size() {
    return {
      width: this.element?.clientWidth,
      height: this.element?.clientHeight,
    };
  }

  public async initialize(input: ArrayBuffer) {
    await this.book.open(input, 'binary');
    await this.book.ready;
    await this.book.loaded.navigation;
  }

  public display(
    element: Element,
    options?: RenditionOptions,
    target?: string
  ) {
    this.element = element;
    this.rendition = this.book.renderTo(element, {
      width: '100%',
      height: '100%',
      ...options,
    });
    this.registerEventListeners();
    this.registerThemes();
    return this.rendition.display(target);
  }

  public goTo(target: string) {
    console.log(target);
    this.rendition.display(target);
  }

  protected registerEventListeners() {
    // rendition events
    this.rendition.on('relocated', (location: Location) => {
      this.currentLocation = location.start.cfi;
      this.currentChapter = this.getChapter(location.start.href);
      this.emit('relocated', {
        location,
        chapter: this.currentChapter,
      } as RelocatedEventPayload);
    });
    this.rendition.hooks.content.register(
      (contents: Contents, view: Rendition) => {
        this.emit('contents', { contents, view });
      }
    );
  }

  protected getChapter(href: string) {
    const [toc] = this.book.navigation.toc.filter((toc) =>
      toc.href.includes(href)
    );
    return toc?.label.trim();
  }

  protected registerThemes() {
    this.rendition.themes.register('dark', {
      body: {
        color: 'white',
        'font-size': 'x-large',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important',
      },
    });
    this.rendition.themes.register('light', {
      body: {
        color: 'black',
        'font-size': 'x-large',
        'padding-top': '0 !important',
        'padding-bottom': '0 !important',
      },
    });
    this.rendition.themes.select('light');
    // this.rendition.themes.register('lamp-reader', 'themse/lamp-reader.css');
    // this.rendition.themes.select('lamp-reader');
  }

  destroy() {
    this.book.destroy();
  }
}
