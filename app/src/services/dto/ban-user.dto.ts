import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BanUserDto {
  readonly serviceId?: number;
  @ApiProperty({ example: 1, description: 'user id' })
  readonly userId: number;
  @ApiProperty({ example: 'any description', description: 'user id' })
  @IsString({ message: 'Must be string' })
  readonly banReason: string;
}
