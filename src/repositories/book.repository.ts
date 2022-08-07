import { BackendRepository } from './backend.repository';
import {
  Book,
  PaginatedBook,
  QueryBookArgs,
  QueryBooksArgs,
} from 'types/backend';
import bookQuery from '@/graphql/queries/book.gql';
import booksQuery from '@/graphql/queries/books.gql';

export class BookRepository extends BackendRepository {
  async findMany(args: QueryBooksArgs) {
    return this.query<QueryBooksArgs, { books: PaginatedBook }>(
      booksQuery,
      args
    ).then((data) => data?.books);
  }
  async findUnique(id: number) {
    return this.query<QueryBookArgs, { book: Book }>(bookQuery, { id }).then(
      (data) => data?.book
    );
  }
}

export const bookRepository = new BookRepository();
