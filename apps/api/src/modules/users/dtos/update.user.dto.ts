import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The updated name of the user', required: false })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The updated avatar URL of the user',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  readonly avatarUrl: string;
}
