import { GraphQLError } from 'graphql';

export function exceptionHandler(error: GraphQLError | unknown, message: string): never {
  if (error instanceof GraphQLError) {
    throw new GraphQLError(error.message);
  }
  throw new GraphQLError(message);
}
