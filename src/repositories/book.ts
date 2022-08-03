import { BackendRepository } from './backend';
import BooksQuery from '@/graphql/queries/books.gql';

export class BookRepository extends BackendRepository {
  async findMany() {
    return this.query(BooksQuery, {});
  }
}
