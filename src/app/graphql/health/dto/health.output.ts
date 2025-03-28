import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class HealthOutput {
  @Field(() => String)
  status!: string;
}
