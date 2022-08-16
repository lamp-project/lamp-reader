import Epub, { Contents, Rendition } from 'epubjs';
import { RenditionOptions, Location } from 'epubjs/types/rendition';
import { EventEmitter } from './utils/EventEmitter';
import { RenditionGesturesEmitter } from './utils/RenditionGesturesEmitter';
import { RenditionNavigator } from './utils/RenditionNavigator';

export class EpubViewer extends EventEmitter {
  #navigator!: RenditionNavigator;
  protected readonly book = Epub();
  protected element!: Element;
  protected rendition!: Rendition;
  protected currentLocation!: string;
  protected currentChapter?: string;
  constructor(protected input: ArrayBuffer) {
    super();
  }

  destroy() {
    this.book.destroy();
  }

  public get size() {
    return {
      width: this.element?.clientWidth,
      height: this.element?.clientHeight,
    };
  }

  public async initialize() {
    await this.book.open(this.input, 'binary');
    // @ts-ignore
    delete this.input;
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
      allowScriptedContent: true,
    });
    this.onWillDisplay();
    return this.rendition.display(target);
  }

  protected onWillDisplay() {
    // Register themes
    this.onRregisterThemesHook();
    // rendition events and hooks
    this.rendition.on('relocated', this.onRelocated.bind(this));
    this.rendition.hooks.content.register(this.onContentHook.bind(this));
    this.rendition.hooks.render.register(this.onRenderHook.bind(this));
    // gestures events
    RenditionGesturesEmitter.listen(this.rendition);
    this.#navigator = new RenditionNavigator(
      this.rendition,
      (this.book.packaging?.metadata as any)?.direction
    );
  }

  protected onRelocated(location: Location) {
    this.currentLocation = location.end.cfi;
    this.currentChapter = this.getChapter(location.start.href);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onContentHook(contents: Contents) {
    //
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onRenderHook(iframeView: { document: Document }) {
    //
  }

  protected onRregisterThemesHook() {
    //
  }

  protected getChapter(
    href: string,
    toc = this.book.navigation.toc
  ): string | undefined {
    for (const item of toc) {
      const chapter = item?.label.trim();
      if (item.href.includes(href)) {
        return chapter;
      } else if (item.subitems?.length) {
        const subChapter = this.getChapter(href, item.subitems);
        if (subChapter) {
          return `${chapter} - ${subChapter}`;
        }
      }
    }
    return undefined;
  }

  public goTo(target: string) {
    console.log(target);
    this.rendition.display(target);
  }
}

