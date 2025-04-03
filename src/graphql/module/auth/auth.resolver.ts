import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { GraphQLBaseResponse } from '../../lib/graphqlBaseResponse.lib.js';
import { AuthService } from './auth.service.js';
import { RefreshTokenInput } from './dto/refreshToken.input.js';
import { RefreshTokenOutput } from './dto/refreshToken.output.js';
import { SignInInput } from './dto/signIn.input.js';
import { SignInOutput } from './dto/signIn.output.js';
import { SignUpInput } from './dto/signUp.input.js';
import { VerifyInput } from './dto/verify.input.js';
import { VerifyLinkInput } from './dto/verifyLink.input.js';

@Resolver()
export class AuthResolver {
  private readonly authService: AuthService = new AuthService();

  @Mutation(() => GraphQLBaseResponse)
  async signUp(@Arg('signUpInput', () => SignUpInput) signUpInput: SignUpInput): Promise<GraphQLBaseResponse> {
    return await this.authService.signUp(signUpInput);
  }

  @Query(() => GraphQLBaseResponse)
  async verifyLink(@Args(() => VerifyLinkInput) verifyLinkInput: VerifyLinkInput): Promise<GraphQLBaseResponse> {
    return await this.authService.verifyLink(verifyLinkInput);
  }

  @Mutation(() => GraphQLBaseResponse)
  async verify(@Arg('verifyInput', () => VerifyInput) verifyInput: VerifyInput): Promise<GraphQLBaseResponse> {
    return await this.authService.verify(verifyInput);
  }

  @Query(() => SignInOutput)
  async signin(@Args(() => SignInInput) signInInput: SignInInput): Promise<SignInOutput> {
    return await this.authService.signIn(signInInput);
  }

  @Query(() => RefreshTokenOutput)
  async refreshToken(@Args(() => RefreshTokenInput) refreshTokenInput: RefreshTokenInput): Promise<RefreshTokenOutput> {
    return await this.authService.refreshToken(refreshTokenInput);
  }
}
