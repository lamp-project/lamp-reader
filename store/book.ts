import { Subject } from './subject';
import { BookPerson } from './book-person';
import Books from '@/graphql/queries/books.gql';

export enum BookSource {
  GUTHENBURGE = 'GUTHENBURGE',
}

export class Book {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  source: BookSource;
  sourceId: string;
  title: string;
  path: string;
  subjects?: Subject[];
  persons?: BookPerson[];
}

export const state = () => ({});

export const mutations = {};

export const actions = {
  getBooks() {
    const client = this.app.apolloProvider.defaultClient;
    return client
      .query({ query: Books })
      .then(({ data }) => data && data.books);
  },
};
