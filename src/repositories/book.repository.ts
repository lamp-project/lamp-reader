import { Book } from '@/entities/Book';
import { find } from 'lodash';

export class BookRepository {
  #records: Book[] = [];
  public get records() {
    return this.#records;
  }

  async init() {
    if (this.#records.length == 0) {
      const [, /** columns, **/ ...rows] = await fetch(
        'https://cdn.jsdelivr.net/gh/lamp-project/library@main/index.tsv'
      )
        .then((res) => res.text())
        .then((source) => source.split('\n').map((line) => line.split('\t')));
      this.#records = rows.map((row) => new Book(row));
    }
    return this.#records;
  }

  findByIdOrThrow(id: string) {
    const book = find(this.#records, { id });
    if (book) {
      return book;
    } else {
      throw new Error(`Book [${id}] not found!`);
    }
  }
}

export const bookRepository = new BookRepository();
