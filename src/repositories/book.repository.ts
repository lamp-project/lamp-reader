import { BackendRepository } from './backend.repository';
import { PaginatedBook, QueryBooksArgs } from 'types/backend';
import BooksQuery from '@/graphql/queries/books.gql';

export class BookRepository extends BackendRepository {
  async findMany(args: QueryBooksArgs) {
    return this.query<QueryBooksArgs, { books: PaginatedBook }>(
      BooksQuery,
      args
    ).then((data) => data?.books);
  }
}

export const bookRepository = new BookRepository();
