import { Location, RenditionOptions } from 'epubjs/types/rendition';
import { EpubViewer, RelocatedEventPayload } from './EpubViewer';
import { BookInfo, Epub } from './utils/Epub';

export class StatefulEpubViewer extends EpubViewer {
  protected readonly bookInfo: BookInfo;
  constructor(epub: Epub) {
    super(epub.content);
    this.bookInfo = epub.info;
  }

  public async display(
    element: Element,
    options?: RenditionOptions
  ): Promise<void> {
    const lastLocation = this.bookInfo.pagination.currentLocation?.end.cfi;
    await super.display(element, options, lastLocation);
    if (
      lastLocation &&
      // @ts-ignore
      this.rendition.currentLocation().end.cfi !== lastLocation
    ) {
      console.warn(`Last location didn't load normal: ${lastLocation}`);
      return this.goTo(lastLocation);
    }
  }

  protected async onRelocated(location: Location): Promise<void> {
    super.onRelocated(location);
    this.bookInfo.pagination.currentLocation = location;
    this.bookInfo.pagination.currentChapter = this.currentChapter;
    await library.updateInfo(this.bookInfo);
    this.emit('page-changed', this.bookInfo.pagination);
  }
}

