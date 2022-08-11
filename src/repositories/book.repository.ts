import {
  Book,
  PaginatedBook,
  QueryBookArgs,
  QueryBooksArgs,
} from 'types/backend';
import bookQuery from '@/graphql/queries/book.gql';
import booksQuery from '@/graphql/queries/books.gql';
import { backend } from '@/utils/Backend';

export class BookRepository {
  async findMany(args: QueryBooksArgs) {
    return backend.query<QueryBooksArgs, { books: PaginatedBook }>(
      booksQuery,
      args
    ).then((data) => data?.books);
  }
  async findUnique(id: number) {
    return backend.query<QueryBookArgs, { book: Book }>(bookQuery, { id }).then(
      (data) => data?.book
    );
  }
}

export const bookRepository = new BookRepository();
