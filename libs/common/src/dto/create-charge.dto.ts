import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CardDto } from "@app/common";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  @Field(() => CardDto)
  card: CardDto;

  @IsNumber()
  @Field()
  amount: number;
};
