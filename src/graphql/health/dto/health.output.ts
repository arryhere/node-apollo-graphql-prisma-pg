import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class HealthOutput {
  @Field(() => String, { nullable: false })
  status!: string;
}
