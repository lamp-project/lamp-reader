// import Subjects from '@/graphql/queries/subjects.gql';

import { Book } from './book';
import { Person } from './person';

export enum PersonRole {
  AUTHOR = 'AUTHOR',
  TRANSLATOR = 'TRANSLATOR',
}

export class BookPerson {
  id: number;
  role: PersonRole;
  bookId: number;
  book?: Book;
  personId: number;
  person?: Person;
}

export const state = () => ({});

export const mutations = {};

export const actions = {};
