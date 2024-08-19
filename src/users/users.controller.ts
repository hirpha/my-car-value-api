import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Seriaze } from 'src/interceptors/serialize.interceptor';
import { UserResponse } from './dtos/user-response.dto';
import { AuthService } from './user.auth.service';

@Controller('auth')
@Seriaze(UserResponse)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Post('/login')
  loginUuser(@Body() body: CreateUserDto) {
    return this.userService.loginUser(body.email, body.password);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.findUserById(parseInt(id));
  }

  @Get('/:id')
  getUserByEmail(@Query('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get('/get-users')
  getAllUsers() {
    console.log('getAllUsers');
    return this.userService.getAllUsers();
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
