import { IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { GraphQLBaseResponse } from '../../common/dto/graphqlBase.response.js';

@ObjectType()
export class SignInOutput extends GraphQLBaseResponse {
  @Field(() => Temp, { nullable: false })
  body!: Temp;
}

@ObjectType()
class Temp {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  accessToken!: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  refreshToken!: string;
}
