import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ description: 'clientId - use your initials' })
  @IsString()
  readonly clientId: string;

  @ApiProperty({ description: 'The text of the todo item' })
  @IsString()
  readonly text: string;

  @ApiProperty({ description: 'The completion status of the todo item', default: false })
  @IsBoolean()
  readonly completed: boolean;
  
  @ApiProperty({ description: 'userId - user assigned to the todo item' })
  @IsNumber()
  readonly userId: number;
}
