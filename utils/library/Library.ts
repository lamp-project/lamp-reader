import { EventEmitter } from 'eventemitter3';
import localforage from 'localforage';
import { EpubBook, importEpubFromFileDialog } from '../epub';
import { LibraryItem } from './LibraryItem';

const CURRENT_READING_KEY = 'current-reading';

class Library extends EventEmitter {
  private readonly contents = localforage.createInstance({ name: 'contents' });
  private readonly index = localforage.createInstance({ name: 'index' });
  private readonly settings = localforage.createInstance({ name: 'settings' });

  public getCurrentReadingId() {
    return this.settings.getItem<string>(CURRENT_READING_KEY);
  }

  public async importEpubFromFileDialog() {
    const book = await importEpubFromFileDialog();
    return this.add(book);
  }

  public async all(): Promise<LibraryItem[]> {
    const keys = await this.index.keys();
    return Promise.all(keys.map((key) => this.index.getItem<any>(key)));
  }

  public async get(id: string) {
    await this.settings.setItem(CURRENT_READING_KEY, id);
    return {
      item: await this.index.getItem<LibraryItem>(id),
      content: await this.contents.getItem<ArrayBuffer>(id),
    };
  }

  public async add(book: EpubBook) {
    const item = new LibraryItem(book);
    await this.index.setItem(item.id, item);
    await this.contents.setItem(item.id, book.content);
    delete book.content;
    this.emit('update');
    return book;
  }

  public async update(item: LibraryItem) {
    await this.index.setItem(item.id, item);
    this.emit('update');
    return item;
  }

  public async remove(id: string) {
    await this.contents.removeItem(id);
    await this.index.removeItem(id);
    this.emit('update');
  }
}

export const library = new Library();
