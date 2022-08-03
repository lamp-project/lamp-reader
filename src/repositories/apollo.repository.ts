import {
  ApolloClient,
  DocumentNode,
  FetchResult,
  InMemoryCache,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

export class ApolloClientRepository {
  private readonly client: ApolloClient<any>;

  constructor(uri: string) {
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      uri,
    });
  }

  protected query<TVar = any, TData = any>(
    query: DocumentNode | TypedDocumentNode<any, OperationVariables>,
    variables: TVar
  ) {
    return this.handleRequest<TData>(
      this.client.query({ query, variables })
    );
  }

  protected mutate<TVar = any, TData = any>(
    mutation: DocumentNode | TypedDocumentNode<any, OperationVariables>,
    variables: TVar
  ) {
    return this.handleRequest<TData>(this.client.mutate({ mutation, variables }));
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
