import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common/logger';
import { DatabaseModule } from '@app/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDocument, UserSchema } from './models/user.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule, 
    DatabaseModule.forFeature([
      { 
        name: UserDocument.name, 
        schema: UserSchema 
      }
    ]),
    LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
