import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PasswordService } from './password.service';

export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
  ) {}

  async signup(email: string, password: string) {
    // see if email  is in use
    const users = await this.userService.findUserByEmail(email);

    if (users.length) {
      throw new BadRequestException('user in use');
    }

    /// hash password

    const hashPassword = await this.passwordService.hashPassword(password);

    /// create user
    const user = await this.userService.create(email, hashPassword);

    return user;
  }


  async signin(email: string, password:string){
      // see if email  is in use
      const users = await this.userService.findUserByEmail(email);

      if (users.length) {
        throw new BadRequestException('user in use');
      }
      /// compare password 

      const checkPassword = await this.passwordService.comparePassword(password, users[0].password)

      if(checkPassword === false){
        throw new BadRequestException("User not found")
      }
      return users[0];
  }
}
