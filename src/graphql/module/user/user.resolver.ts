import { Role } from '@prisma/client';
import GraphQLUpload, { type FileUpload } from 'graphql-upload/GraphQLUpload.mjs';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { config } from '../../../config/config.js';
import { AuthorizedRole } from '../../decorator/authorizedRole.decorator.js';
import type { ApolloGraphqlContext } from '../../interface/apolloGraphqlContext.interface.js';
import { GraphQLBaseResponse } from '../../lib/graphqlBaseResponse.lib.js';
import { GetUserProfileOutput } from './dto/getUserProfile.output.js';
import { UserService } from './user.service.js';

@Resolver()
export class UserResolver {
  private readonly userService: UserService = new UserService();

  @Authorized()
  @AuthorizedRole([Role.SUPER_ADMIN, Role.ADMIN, Role.USER])
  @Query(() => GetUserProfileOutput)
  async getUserProfile(@Ctx() ctx: ApolloGraphqlContext): Promise<GetUserProfileOutput> {
    return await this.userService.getUserProfile(ctx);
  }

  @Mutation(() => GraphQLBaseResponse)
  async uploadUserProfileImage(@Arg('file', () => GraphQLUpload) file: FileUpload): Promise<GraphQLBaseResponse> {
    return {
      environment: config.app.APP_ENV,
      success: true,
      message: 'uploadUserProfileImage',
    };
  }
}
