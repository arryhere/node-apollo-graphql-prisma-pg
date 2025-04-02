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

/**
 * 
 * 
 * {
  id: '1c51353e-62e1-40f6-b089-1d9d7f8b96f5',
  firstName: 'Arijit',
  lastName: 'Das',
  email: 'arijit+user@itobuz.com',
  dob: '1999-05-28',
  phoneNumber: '+91 9123929831',
  passwordHash: '$2b$10$KbH8XpshYrmoonTD1N4V3.6NW4Of7vN1G2dhZQX3EMKt82QumIakS',
  role: 'USER',
  verified: true,
  active: true,
  twoFA: false,
  failedLoginCount: 0,
  accountLockedAt: null,
  createdAt: 2025-03-31T10:14:00.499Z,
  updatedAt: 2025-03-31T10:14:37.867Z
}
 */
