import { Contents, Rendition } from 'epubjs';
import { RenditionOptions, Location } from 'epubjs/types/rendition';
import { EPub } from './utils/Epub';
import { RenditionGesturesEmitter } from './utils/RenditionGesturesEmitter';
import { RenditionNavigator } from './utils/RenditionNavigator';

export interface PageChangedEventPlayload {
  location: Location;
  chapter?: string;
}

export class EpubViewer<E> extends EPub<E | 'page-changed' | 'click-tap'> {
  protected element!: Element;
  protected rendition!: Rendition;
  #location!: Location;
  #chapter?: string;
  protected navigator!: RenditionNavigator;

  public get location() {
    return this.#location;
  }

  public get chapter() {
    return this.#chapter;
  }

  public get percentage() {
    return (this.location?.end.percentage || 0) * 100;
  }

  public get leftPagesOfTheChapter() {
    const displayed = this.location.end.displayed;
    return displayed ? displayed.total - displayed.page : -1;
  }

  public get size() {
    return {
      width: this.element?.clientWidth,
      height: this.element?.clientHeight,
    };
  }

  public async display(
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
    await this.rendition.display(target);
    console.log(target);
    const currentLocation: Location = this.rendition.currentLocation() as any;
    if (target && currentLocation.end.cfi !== target) {
      console.warn(`Last location didn't load normal: ${target}`);
      return this.goTo(target);
    }
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
    this.navigator = new RenditionNavigator(
      this.rendition,
      (this.book.packaging?.metadata as any)?.direction
    );
    // mouse events
    this.rendition.on('click', () => this.emit<void>('click-tap'));
  }

  protected onRelocated(location: Location) {
    this.#location = location;
    this.#chapter = this.getChapter(location.start.href);
    this.emit<PageChangedEventPlayload>('page-changed', {
      location,
      chapter: this.#chapter,
    });
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

  public goTo(target: string | number) {
    // @ts-ignore
    return this.rendition.display(target);
  }
}

