import { Args, Mutation, Resolver } from 'type-graphql';
import { GraphQLBaseResponse } from '../common/dto/graphqlBase.response.js';
import { SignUpInput } from './dto/signUp.input.js';

@Resolver()
export class AuthResolver {
  @Mutation(() => GraphQLBaseResponse)
  async signUp(@Args() signUpInput: SignUpInput): Promise<GraphQLBaseResponse> {
    console.log('signUpInput', signUpInput);
    return {
      environment: 'development',
      success: true,
      message: 'User signed up successfully',
    };
  }
}
