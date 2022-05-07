import { ApiProperty } from '@nestjs/swagger';

export class DeleteServiceDto {
  @ApiProperty({ example: 1, description: 'service id' })
  readonly serviceId: number;
  @ApiProperty({ example: 1, description: 'user id' })
  readonly userId: number;
}
