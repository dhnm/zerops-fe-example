import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'clientId - use your initials' })
  @IsString()
  readonly clientId: string;

  @ApiProperty({ description: "User's name" })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: "URL address of the user's avatar" })
  @IsString()
  readonly avatarUrl: string;
}
