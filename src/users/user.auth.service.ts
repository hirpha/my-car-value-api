import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { PasswordService } from './password.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
  ) {
    console.log('auth service', this.userService);
  }

  async signup(email: string, password: string) {
    // see if email is in use'

    const user = await this.userService.findUserByEmail(email);
    console.log('user', password);
    if (user) {
      throw new BadRequestException('Email is already in use');
    }

    // hash password
    const hashPassword = await this.passwordService.hashPassword(password);

    // create user
    const newUser = await this.userService.create(email, hashPassword);

    return newUser;
  }

  async signin(email: string, password: string) {
    // see if email exists
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // compare password
    const checkPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!checkPassword) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
