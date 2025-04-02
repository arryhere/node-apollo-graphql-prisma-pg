import { Field, ObjectType } from 'type-graphql';
import { GraphQLBaseResponse } from '../../../lib/graphqlBaseResponse.lib.js';

@ObjectType()
export class SignInOutput extends GraphQLBaseResponse {
  @Field(() => SignInOutputBody, { nullable: false })
  body!: SignInOutputBody;
}

@ObjectType()
class SignInOutputBody {
  @Field(() => String, { nullable: false })
  accessToken!: string;

  @Field(() => String, { nullable: false })
  refreshToken!: string;
}
