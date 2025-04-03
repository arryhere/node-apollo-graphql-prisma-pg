import { IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class RefreshTokenInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  refreshToken!: string;
}
