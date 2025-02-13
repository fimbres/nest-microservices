import { IsEmail, IsStrongPassword } from "class-validator";
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @IsEmail()
  @Field()
  email: string;

  @IsStrongPassword()
  @Field()
  password: string;
}
