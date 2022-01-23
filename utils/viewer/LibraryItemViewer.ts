/* eslint-disable no-console */
import { RenditionOptions } from 'epubjs/types/rendition';
import { LibraryItem } from '../library/LibraryItem';
import { EpubPaginatedViewer } from './EpubPaginatedViewer';
import { RelocatedEventPayload } from './EpubViewerBase';

export class LibraryItemViewer extends EpubPaginatedViewer {
  constructor(private readonly item: LibraryItem, content: ArrayBuffer) {
    super(content);
  }

  public display(element: Element, options?: RenditionOptions): Promise<void> {
    return super.display(
      element,
      options,
      this.item.currentLocation?.start.cfi
    );
  }

  /**
   * Skipping pagination if exists
   */
  protected paginate() {
    if (
      this.item.pagination.size.width === this.size.width &&
      this.item.pagination.size.height === this.size.height
    ) {
      this.pages = this.item.pagination.pages;
      console.log('pagination will load from cache');
    } else {
      return super.paginate();
    }
  }

  protected registerEventListeners() {
    super.registerEventListeners();
    // rendition events
    this.on('relocated', ({ location, chapter }: RelocatedEventPayload) => {
      this.item.currentLocation = location;
      this.item.pagination.currentChapter = chapter;
      this.item.pagination.currentPage = this.currentPage;
      this.emit('item-updated');
    });

    // pagination events
    this.on('pagination-update', () => {
      this.item.pagination.pages = this.pages;
      this.item.pagination.currentPage = this.currentPage;
      this.emit('item-updated');
    });

    this.on('pagination-done', () => {
      this.item.pagination.pages = this.pages;
      this.item.pagination.size = this.size;
      this.emit('item-updated');
    });
  }
}
