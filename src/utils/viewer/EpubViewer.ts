import { Contents, Rendition } from 'epubjs';
import { RenditionOptions, Location } from 'epubjs/types/rendition';
import { EPub } from './utils/EPub';
import { RenditionGesturesEmitter } from './utils/RenditionGesturesEmitter';
import { RenditionNavigator } from './utils/RenditionNavigator';

export interface PageChangedEventPlayload {
  location: Location;
  chapter?: string;
}

export class EpubViewer extends EPub {
  protected element!: Element;
  protected rendition!: Rendition;
  protected location!: Location;
  protected chapter?: string;
  protected navigator!: RenditionNavigator;

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
    this.rendition.on('click', () => this.emit('click-tap'));
  }

  protected onRelocated(location: Location) {
    this.location = location;
    this.chapter = this.getChapter(location.start.href);
    this.emit('page-changed', {
      location,
      chapter: this.chapter,
    } as PageChangedEventPlayload);
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

  public goTo(target: string) {
    console.log(target);
    this.rendition.display(target);
  }
}

