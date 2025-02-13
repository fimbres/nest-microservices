import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";

import { CardDto } from "./card.dto";

export class CreateReservationDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  card: CardDto;

  @IsNumber()
  amount: number;
}
