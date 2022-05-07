import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.test', description: 'Email' })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @ApiProperty({ example: 'test', description: 'Name' })
  @IsString({ message: 'Must be string' })
  readonly name: string;
}
