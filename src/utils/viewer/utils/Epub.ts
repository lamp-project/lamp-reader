import loadEbpub, { Book } from 'epubjs';
import { PackagingMetadataObject } from 'epubjs/types/packaging';
import { EventEmitter } from './EventEmitter';

export interface EpubMeta extends PackagingMetadataObject {
  cover: Blob | null;
}

//@ts-ignore
export class EPub extends EventEmitter {
  protected readonly book!: Book;
  #locations?: string[];

  constructor(file: ArrayBuffer, locations?: string[]) {
    super();
    this.book = loadEbpub(file);
    this.#locations = locations;
  }

  public get locations() {
    return this.#locations;
  }

  public async getMeta(): Promise<EpubMeta> {
    await this.book.loaded.metadata;
    const cover = await this.getCover();
    return {
      ...JSON.parse(JSON.stringify(this.book.packaging?.metadata)),
      cover,
    };
  }

  public async getArchiveFile(path: string) {
    return this.book.archive.getText(this.book.resolve(path));
  }

  public async getCover() {
    if (this.book?.packaging.coverPath) {
      await this.book.loaded.cover;
      return this.book.archive.getBlob(
        this.book.resolve(this.book.packaging.coverPath)
      );
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async initialize(...args: any[]) {
    await this.book.ready;
    await this.book.loaded.navigation;
    if (this.#locations) {
      // @ts-ignore
      this.book.locations.load(this.locations);
    } else {
      this.#locations = await this.book.locations.generate(150);
    }
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

  destroy() {
    this.book.destroy();
  }
}

