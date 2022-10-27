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
  syncUserWords: Array<UserWord>;
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


export type MutationSyncUserWordsArgs = {
  input: SyncUserWordsInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export type ReviewInput = {
  status: UserWordStatus;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  word: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignupInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type SyncUserWordsInput = {
  userWords: Array<ReviewInput>;
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
  word: Scalars['String'];
};

export enum UserWordStatus {
  Known = 'KNOWN',
  Learning = 'LEARNING'
}
