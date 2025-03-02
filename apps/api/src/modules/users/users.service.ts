import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.usersRepository.save(data);
  }

  async findAll(clientId: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { clientId },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return await this.usersRepository.save({ id, ...data });
  }

  async remove(id: number): Promise<number> {
    const deletedData = await this.usersRepository.delete(id);
    return deletedData.affected;
  }
}
