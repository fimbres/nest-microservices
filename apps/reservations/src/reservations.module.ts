import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '@app/common';
import { LoggerModule } from '@app/common/logger';
import { AUTH_SERVICE } from '@app/common/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

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
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URI: Joi.string().required(),
      })
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({ 
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: 3002
          }
        }),
        inject: [ConfigService],
      }
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
