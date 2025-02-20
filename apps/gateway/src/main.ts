import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { setApp } from './app';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
  setApp(app);
}
bootstrap();
