import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UserDto } from "@app/common";
import { CurrentUser } from "apps/auth/src/current-user.decorator";

import { ReservationDocument } from "./models/reservation.schema";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";

@Resolver(() => ReservationDocument)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => ReservationDocument)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationDto,
    @CurrentUser()
    user: UserDto
  ) {
    return this.reservationsService.create(createReservationInput, user);
  }

  @Mutation(() => ReservationDocument)
  removeReservation(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.reservationsService.remove(id);
  }

  @Query(() => [ReservationDocument], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => ReservationDocument, { name: 'reservation' })
  findOne(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.reservationsService.findOne(id);
  }
}
