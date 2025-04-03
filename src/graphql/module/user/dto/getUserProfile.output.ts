import { Role } from '@prisma/client';
import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';
import { GraphQLBaseResponse } from '../../../lib/graphqlBaseResponse.lib.js';

@ObjectType()
export class GetUserProfileOutput extends GraphQLBaseResponse {
  @Field(() => GetUserProfileOutputBody, { nullable: false })
  body!: GetUserProfileOutputBody;
}

@ObjectType()
class GetUserProfileOutputBody {
  @Field(() => ID, { nullable: false })
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

  @Field(() => Role, { nullable: false })
  role!: Role;

  @Field(() => Boolean, { nullable: false })
  verified!: boolean;

  @Field(() => Boolean, { nullable: false })
  active!: boolean;

  @Field(() => Boolean, { nullable: false })
  twoFA!: boolean;

  @Field(() => Int, { nullable: false })
  failedLoginCount!: number;

  @Field(() => Date, { nullable: true })
  accountLockedAt!: Date | null;

  @Field(() => Date, { nullable: true })
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt!: Date;
}

registerEnumType(Role, {
  name: 'Role', // Mandatory
  description: 'User Role', // Optional
});
