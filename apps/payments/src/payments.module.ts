import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URI: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        PORT: Joi.number().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_PUBLIC_KEY: Joi.string().required(),
      })
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: AUTH_SERVICE,
    //     useFactory: (configService: ConfigService) => ({ 
    //       transport: Transport.TCP,
    //       options: {
    //         host: configService.get('AUTH_HOST'),
    //         port: 3002
    //       }
    //     }),
    //     inject: const [ConfigService],
    //   }
    // ])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
