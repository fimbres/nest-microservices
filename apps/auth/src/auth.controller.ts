import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './users/models/user.schema';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.login(user, response);
    
    response.send(user);
  }
}
