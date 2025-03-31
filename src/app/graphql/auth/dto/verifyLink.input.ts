import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class VerifyLinkInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: false })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  password!: string;
}
