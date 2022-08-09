import {
  ApolloClient,
  DocumentNode,
  FetchResult,
  InMemoryCache,
  OperationVariables,
  TypedDocumentNode,
  HttpLink,
} from '@apollo/client/core';

export class GraphqlClient {
  private readonly client: ApolloClient<any>;
  protected readonly headers: any = {};

  constructor(uri: string) {
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri,
        headers: this.headers,
      }),
    });
  }

  public query<TVar = any, TData = any>(
    query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
    variables?: TVar
  ) {
    return this.handleRequest<TData>(this.client.query({ query, variables }));
  }

  public mutate<TVar = any, TData = any>(
    mutation: DocumentNode | TypedDocumentNode<any, OperationVariables>,
    variables?: TVar
  ) {
    return this.handleRequest<TData>(
      this.client.mutate({ mutation, variables })
    );
  }

  private handleRequest<TData>(req: Promise<FetchResult<TData>>) {
    return req
      .then(({ data, errors }) => {
        if (errors?.length) {
          throw errors[0];
        } else {
          return data as TData;
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
