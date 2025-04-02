import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Field(() => String, { nullable: false })
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Field(() => String, { nullable: false })
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: false })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Field(() => String, { nullable: false })
  dob!: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  @Field(() => String, { nullable: false })
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Field(() => String, { nullable: false })
  password!: string;
}
