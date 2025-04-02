import { Field, ObjectType } from 'type-graphql';
import { GraphQLBaseResponse } from '../../../lib/graphqlBaseResponse.lib.js';

@ObjectType()
export class GetUserProfileOutput extends GraphQLBaseResponse {
  @Field(() => GetUserProfileOutputBody, { nullable: false })
  body!: GetUserProfileOutputBody;
}

@ObjectType()
class GetUserProfileOutputBody {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  lastName!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  dob!: string;

  @Field(() => String, { nullable: false })
  phoneNumber!: string;
}
