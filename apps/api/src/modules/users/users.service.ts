import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.entity';
import { CreateUserDto } from './dtos/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  async findAll(clientId: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { clientId },
    });
  }

  async remove(id: number): Promise<number> {
    const deletedData = await this.usersRepository.delete(id);
    return deletedData.affected;
  }
}
