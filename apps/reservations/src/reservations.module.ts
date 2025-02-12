import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { LoggerModule } from '@app/common/logger';

import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';

@Module({
  imports: [
    DatabaseModule, 
    DatabaseModule.forFeature([
      { 
        name: ReservationDocument.name, 
        schema: ReservationSchema 
      }
    ]),
    LoggerModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
