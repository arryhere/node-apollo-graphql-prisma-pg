import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class SignInInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password!: string;
}
