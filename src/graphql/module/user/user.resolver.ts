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
    /*
curl --location 'http://localhost:4005/graphql' \
--header 'Apollo-Require-Preflight: true' \
--header 'x-apollo-operation-name: UploadUserProfileImage' \
--form 'operations={"query":"mutation UploadUserProfileImage($file: Upload!) { uploadUserProfileImage(file: $file) { success message } }","variables":{"file": null}}' \
--form 'map={"0":["variables.file"]}' \
--form '0=@"/Users/arijit/Pictures/Image 67171553 673x949.jpg"'
  */

    const { createReadStream, filename, mimetype } = file;

    // Convert stream to buffer
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const stream = createReadStream();

      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (err) => reject(err));
    });

    console.log({
      filename,
      mimetype,
      buffer: buffer,
    });
    return {
      environment: config.app.APP_ENV,
      success: true,
      message: 'uploadUserProfileImage',
    };
  }
}
