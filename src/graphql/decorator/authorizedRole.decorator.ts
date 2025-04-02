import type { Role } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { createMethodMiddlewareDecorator } from 'type-graphql';
import type { ApolloGraphqlContext } from '../interface/apolloGraphqlContext.interface.js';

export function AuthorizedRole(roles: Role[]) {
  return createMethodMiddlewareDecorator<ApolloGraphqlContext>(async ({ root, args, context, info }, next) => {
    if (!context.user) {
      throw new GraphQLError('Unauthorized');
    }

    if (roles.length && !roles.includes(context.user?.role)) {
      throw new GraphQLError('Unauthorized');
    }

    return next();
  });
}
