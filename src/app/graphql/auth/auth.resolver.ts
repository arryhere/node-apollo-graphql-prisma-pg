import { Arg, Mutation, Resolver } from 'type-graphql';
import { GraphQLBaseResponse } from '../common/dto/graphqlBase.response.js';
import { SignUpInput } from './dto/signUp.input.js';

@Resolver()
export class AuthResolver {
  @Mutation(() => GraphQLBaseResponse)
  async signUp(@Arg('signUpInput', () => SignUpInput) signUpInput: SignUpInput): Promise<GraphQLBaseResponse> {
    console.log('Received signUpInput:', signUpInput);

    return {
      environment: 'development',
      success: true,
      message: 'User signed up successfully',
    };
  }
}
