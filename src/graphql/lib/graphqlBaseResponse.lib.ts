import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class GraphQLBaseResponse {
  @Field(() => String, { nullable: false })
  environment!: string;

  @Field(() => Boolean, { nullable: false })
  success!: boolean;

  @Field(() => String, { nullable: false })
  message!: string;
}
