import { Arg, Mutation, Resolver } from 'type-graphql';
import { GraphQLBaseResponse } from '../common/dto/graphqlBase.response.js';
import { AuthService } from './auth.service.js';
import { SignUpInput } from './dto/signUp.input.js';

@Resolver()
export class AuthResolver {
  private readonly authService: AuthService = new AuthService();

  @Mutation(() => GraphQLBaseResponse)
  async signUp(@Arg('signUpInput', () => SignUpInput) signUpInput: SignUpInput): Promise<GraphQLBaseResponse> {
    return await this.authService.signUp(signUpInput);
  }
}
