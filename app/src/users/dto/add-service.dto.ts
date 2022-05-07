import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddServiceDto {
  @ApiProperty({ example: 1, description: 'service id' })
  @IsNumber({}, { message: 'Must be number' })
  readonly serviceId: number;
  readonly userId?: number;
}
