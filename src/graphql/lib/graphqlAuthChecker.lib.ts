import type { AuthChecker } from 'type-graphql';
import type { ApolloGraphqlContext } from '../interface/apolloGraphqlContext.interface.js';

export const graphqlAuthChecker: AuthChecker<ApolloGraphqlContext> = ({ root, args, context, info }, roles) => {
  // Read user from context
  // and check the user's permission against the `roles` argument
  // that comes from the '@Authorized' decorator, eg. ["ADMIN", "MODERATOR"]

  const headers = context.req.headers;

  console.log({ root, args, context, info, roles });

  return true; // or 'false' if access is denied
};
