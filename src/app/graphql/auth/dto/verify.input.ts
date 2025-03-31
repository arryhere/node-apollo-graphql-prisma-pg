import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class VerifyInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  token!: string;
}
