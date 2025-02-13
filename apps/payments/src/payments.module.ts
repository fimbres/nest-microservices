import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { LoggerModule, NOTIFICATIONS_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT_TCP: Joi.number().required(),
        NOTIFICATIONS_PORT: Joi.number().required(),
        NOTIFICATIONS_HOST: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_PUBLIC_KEY: Joi.string().required(),
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      }
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NOTIFICATIONS_HOST'),
            port: configService.get('NOTIFICATIONS_PORT'),
          }
        }),
        inject: [ConfigService],
      }
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsResolver],
})
export class PaymentsModule {}
