import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ForgotPasswordInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email!: string;
}
