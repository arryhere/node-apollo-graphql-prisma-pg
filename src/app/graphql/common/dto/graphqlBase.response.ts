import { Field, ObjectType } from 'type-graphql';
import { config } from '../../../../config/config.js';

@ObjectType()
export class GraphQLBaseResponse {
  @Field(() => String, { nullable: false, defaultValue: config.app.APP_ENV })
  environment!: string;

  @Field(() => Boolean, { nullable: false })
  success!: boolean;

  @Field(() => String, { nullable: false })
  message!: string;
}
