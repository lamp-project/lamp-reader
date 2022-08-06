import { BackendRepository } from './backend.repository';
import {
  Book,
  PaginatedBook,
  QueryBookArgs,
  QueryBooksArgs,
} from 'types/backend';
import BookQuery from '@/graphql/queries/book.gql';
import BooksQuery from '@/graphql/queries/books.gql';

export class BookRepository extends BackendRepository {
  async findMany(args: QueryBooksArgs) {
    return this.query<QueryBooksArgs, { books: PaginatedBook }>(
      BooksQuery,
      args
    ).then((data) => data?.books);
  }
  async findUnique(id: number) {
    return this.query<QueryBookArgs, { book: Book }>(BookQuery, { id }).then(
      (data) => data?.book
    );
  }
}

export const bookRepository = new BookRepository();
