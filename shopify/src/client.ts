import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import type { Variables } from 'graphql-request';

import { resolveStorefrontConfig } from './config';

/** Normalized transport error — callers never see raw graphql-request errors. */
export class StorefrontRequestError extends Error {
  constructor(operation: string, cause: unknown) {
    super(`Storefront request failed: ${operation}`);
    this.name = 'StorefrontRequestError';
    this.cause = cause;
  }
}

let client: GraphQLClient | null = null;

const getClient = (): GraphQLClient => {
  if (client === null) {
    const { endpoint, headers } = resolveStorefrontConfig();
    client = new GraphQLClient(endpoint, { headers: { ...headers } });
  }
  return client;
};

const operationName = (document: DocumentNode): string => {
  for (const definition of document.definitions) {
    if (definition.kind === 'OperationDefinition' && definition.name) {
      return definition.name.value;
    }
  }
  return 'anonymous operation';
};

/** Execute a generated, fully typed Storefront operation. */
export const executeStorefront = async <TResult, TVariables extends Variables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
): Promise<TResult> => {
  try {
    // graphql-request's variadic overload can't prove a *generic* `TVariables`
    // is non-empty, so we call it with the concrete `Variables` type — the
    // public generics above still keep callers' documents and variables in sync.
    return await getClient().request<TResult, Variables>(
      document as TypedDocumentNode<TResult, Variables>,
      variables,
    );
  } catch (error) {
    throw new StorefrontRequestError(operationName(document), error);
  }
};
