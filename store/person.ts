// import Subjects from '@/graphql/queries/subjects.gql';

import { BookPerson } from './book-person';

export class Person {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  birthYear: number;
  deathYear: number;
  name: string;
  books?: BookPerson[];
}

export const state = () => ({});

export const mutations = {};

export const actions = {};
