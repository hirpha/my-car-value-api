import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  ///////////////////
  /// create user

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return await this.repo.save(user);
  }

  ///////////////////
  /// login user

  async loginUser(email: string, password: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('user not found with this email');
    }
    if (user.password !== password) {
      throw new NotFoundException('Invalid credential');
    }

    return user;
  }
  ///////////////////
  /// find user by id

  async findUserById(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  ///////////////////
  /// find user by email
  async findUserByEmail(email: string) {
    const user = await this.repo.find({ where: { email } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  ///////////////////
  /// update user

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  ///////////////////
  /// update user

  async remove(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }

  ///////////////////
  /// get all users

  async getAllUsers() {
    console.log('coming...');
    const users = await this.repo.find();

    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return { users };
  }
}
