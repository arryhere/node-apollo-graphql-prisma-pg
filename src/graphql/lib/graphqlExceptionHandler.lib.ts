import { GraphQLError } from 'graphql';

/* use in catch block in graphql only */
export function graphqlExceptionHandler(error: GraphQLError | unknown, message: string): never {
  if (error instanceof GraphQLError) {
    throw new GraphQLError(error.message);
  }
  throw new GraphQLError(message);
}
