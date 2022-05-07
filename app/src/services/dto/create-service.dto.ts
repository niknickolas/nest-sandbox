import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'test title', description: 'service title' })
  @IsString({ message: 'Must be string' })
  readonly title: string;
  @ApiProperty({ example: 'test description', description: 'service description' })
  @IsString({ message: 'Must be string' })
  readonly description: string;
}
