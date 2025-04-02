import { Role } from '@prisma/client';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { AuthorizedRole } from '../../decorator/authorizedRole.decorator.js';
import type { ApolloGraphqlContext } from '../../interface/apolloGraphqlContext.interface.js';
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
}
