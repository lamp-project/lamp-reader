import { Subject } from './subject';
import { BookPerson } from './book-person';
import BooksQuery from '@/graphql/queries/books.gql';
import TopTenOfLevelsQuery from '@/graphql/queries/top-ten-of-levels.gql';

export enum BookSource {
  GUTHENBURGE = 'GUTHENBURGE',
}
export class BookCover {
  small: string;
  medium: string;
}

export class Book {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  source: BookSource;
  sourceId: string;
  title: string;
  book: string;
  cover: BookCover;
  subjects: Subject[];
  persons: BookPerson[];
}

export const state = () => ({});

export const mutations = {};

export const actions = {
  getBooks() {
    const client = this.app.apolloProvider.defaultClient;
    return client
      .query({ query: BooksQuery })
      .then(({ data }) => data && data.books);
  },
  getTopTenOfLevels() {
    const client = this.app.apolloProvider.defaultClient;
    return client
      .query({ query: TopTenOfLevelsQuery })
      .then(({ data }) => data && data.topTenOfLevels);
  },
};
