import { IsNotEmpty, IsString } from "class-validator";
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  _id: string;
}
