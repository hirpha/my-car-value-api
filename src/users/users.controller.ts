import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Seriaze } from 'src/interceptors/serialize.interceptor';
import { UserResponse } from './dtos/user-response.dto';

@Controller('auth')
@Seriaze(UserResponse)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Post('/login')
  loginUuser(@Body() body: CreateUserDto) {
    return this.userService.loginUser(body.email, body.password);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.findUserById(parseInt(id));
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
