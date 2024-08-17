import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email  is in use
    const users = await this.userService.findUserByEmail(email);

    if (users.length) {
      throw new BadRequestException('user in use');
    }
  }
}
