import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ResetPasswordInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  token!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Field(() => String)
  newPassword!: string;
}
