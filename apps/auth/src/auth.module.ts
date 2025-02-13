import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
/* @ts-ignore */
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LocalMethod } from './methods/local.method';
import { JwtMethod } from './methods/jwt.method';

@Module({
  imports: [
    UsersModule, 
    LoggerModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(), 
      })
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '86400s'
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalMethod, JwtMethod],
})
export class AuthModule {}
