import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create.todo.dto';
import { UpdateTodoDto } from './dtos/update.todo.dto';
import { Todo } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.todosRepository.save(createTodoDto);
    return this.findOne(todo.id);
  }

  async findAll(clientId: string): Promise<Todo[]> {
    return this.todosRepository.find({
      where: { clientId },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Todo> {
    const data = await this.todosRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!data) {
      throw new NotFoundException('todo not found');
    }
    return data;
  }

  async update(id: number, data: UpdateTodoDto): Promise<Todo> {
    const updatedData = await this.todosRepository.save({ id, ...data });
    return this.findOne(updatedData.id);
  }

  async remove(id: number): Promise<number> {
    const deletedData = await this.todosRepository.delete(id);
    return deletedData.affected;
  }

  async markAllAsCompleted(clientId: string): Promise<void> {
    await this.todosRepository.update(
      { completed: false, clientId },
      { completed: true }
    );
  }
}
