import { GraphQLError } from 'graphql';
import { config } from '../../../config/config.js';
import type { ApolloGraphqlContext } from '../../interface/apolloGraphqlContext.interface.js';
import { graphqlExceptionHandler } from '../../lib/graphqlExceptionHandler.lib.js';
import type { GetUserProfileOutput } from './dto/getUserProfile.output.js';

export class UserService {
  async getUserProfile(ctx: ApolloGraphqlContext): Promise<GetUserProfileOutput> {
    try {
      if (!ctx.user) throw new GraphQLError('User not found');

      return {
        environment: config.app.APP_ENV,
        success: true,
        message: 'User profile retrieved successfully',
        body: {
          ...ctx.user,
        },
      };
    } catch (error) {
      graphqlExceptionHandler(error, 'Error: UserService > getUserProfile');
    }
  }
}
