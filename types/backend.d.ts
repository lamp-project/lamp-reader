export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Book = {
  __typename?: 'Book';
  HWR: Scalars['Int'];
  UWC: Scalars['Int'];
  cover: BookCover;
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  id: Scalars['ID'];
  level: BookLevel;
  persons: Array<BookPerson>;
  source: BookSource;
  sourceId: Scalars['String'];
  subjects: Array<Subject>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  version: Scalars['String'];
};

export type BookCover = {
  __typename?: 'BookCover';
  medium: Scalars['String'];
  small: Scalars['String'];
};

export type BookEdge = {
  __typename?: 'BookEdge';
  cursor: Scalars['String'];
  node: Book;
};

export type BookLevel = {
  __typename?: 'BookLevel';
  A1: BookLevelDetails;
  A2: BookLevelDetails;
  B1: BookLevelDetails;
  B2: BookLevelDetails;
  C1: BookLevelDetails;
  C2: BookLevelDetails;
};

export type BookLevelDetails = {
  __typename?: 'BookLevelDetails';
  count: Scalars['Int'];
  readability: Scalars['Float'];
};

export type BookPerson = {
  __typename?: 'BookPerson';
  book?: Maybe<Book>;
  bookId: Scalars['Float'];
  id: Scalars['ID'];
  person?: Maybe<Person>;
  personId: Scalars['Float'];
  role: PersonRole;
};

export enum BookSource {
  EnglishEReader = 'ENGLISH_E_READER',
  Guthenburge = 'GUTHENBURGE'
}

export type BooksFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFloatFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  version?: InputMaybe<StringFilter>;
};

export type BooksOrderBy = {
  RA1?: InputMaybe<OrderBy>;
  RA2?: InputMaybe<OrderBy>;
  RB1?: InputMaybe<OrderBy>;
  RB2?: InputMaybe<OrderBy>;
  RC1?: InputMaybe<OrderBy>;
  RC2?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
};

export type IntFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  jwt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  review: UserWord;
  signup: LoginResponse;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationReviewArgs = {
  input: ReviewInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PaginatedBook = {
  __typename?: 'PaginatedBook';
  edges?: Maybe<Array<BookEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Person = {
  __typename?: 'Person';
  birthYear: Scalars['Float'];
  books: Array<BookPerson>;
  createdAt: Scalars['DateTime'];
  deathYear: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PersonEdge = {
  __typename?: 'PersonEdge';
  cursor: Scalars['String'];
  node: Person;
};

export enum PersonRole {
  Author = 'AUTHOR',
  Translator = 'TRANSLATOR'
}

export type Query = {
  __typename?: 'Query';
  book: Book;
  books: PaginatedBook;
  me: User;
  myUserWords: Array<UserWord>;
  topTenOfLevels: TopTenOfLevels;
};


export type QueryBookArgs = {
  id: Scalars['Int'];
};


export type QueryBooksArgs = {
  after?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<BooksFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BooksOrderBy>;
};

export type ReviewInput = {
  status: UserWordStatus;
  word: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignupInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  token: Scalars['String'];
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
};

export type Subject = {
  __typename?: 'Subject';
  createdAt: Scalars['DateTime'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SubjectEdge = {
  __typename?: 'SubjectEdge';
  cursor: Scalars['String'];
  node: Subject;
};

export type TopTenOfLevels = {
  __typename?: 'TopTenOfLevels';
  A1: Array<Book>;
  A2: Array<Book>;
  B1: Array<Book>;
  B2: Array<Book>;
  C1: Array<Book>;
  C2: Array<Book>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  role: Role;
  updatedAt: Scalars['DateTime'];
  words?: Maybe<Array<UserWord>>;
};

export type UserWord = {
  __typename?: 'UserWord';
  createdAt: Scalars['DateTime'];
  status: UserWordStatus;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId: Scalars['Int'];
  word?: Maybe<Word>;
  wordId: Scalars['String'];
};

export enum UserWordStatus {
  Known = 'KNOWN',
  Learning = 'LEARNING'
}

export type Word = {
  __typename?: 'Word';
  occurrence: Scalars['Float'];
  rank: Scalars['Int'];
  users?: Maybe<Array<UserWord>>;
  word: Scalars['String'];
};
