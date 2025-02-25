import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({ description: 'The updated text of the todo item', required: false })
  @IsOptional()
  @IsString()
  readonly text: string;

  @ApiProperty({ description: 'The updated completion status of the todo item', required: false })
  @IsOptional()
  @IsBoolean()
  readonly completed: boolean;
  
  @ApiProperty({ description: 'The updated user assigned to the todo item', required: false })
  @IsOptional()
  @IsNumber()
  readonly userId: number;
}
