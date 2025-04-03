import { Field, ObjectType } from 'type-graphql';
import { GraphQLBaseResponse } from '../../../lib/graphqlBaseResponse.lib.js';

@ObjectType()
export class RefreshTokenOutput extends GraphQLBaseResponse {
  @Field(() => RefreshTokenOutputBody, { nullable: false })
  body!: RefreshTokenOutputBody;
}

@ObjectType()
class RefreshTokenOutputBody {
  @Field(() => String, { nullable: false })
  accessToken!: string;

  @Field(() => String, { nullable: false })
  refreshToken!: string;
}
