import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";

import { UsersService } from "../users/users.service";

@Injectable()
export class LocalMethod extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async verifyUser(email: string, password: string) {
    try {
      return await this.usersService.validateUser(email, password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
