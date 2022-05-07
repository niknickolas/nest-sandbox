import { ApiProperty } from '@nestjs/swagger';

export class PopularServicesDto {
  @ApiProperty({ example: 1, description: 'service id' })
  readonly serviceId: number;
  @ApiProperty({ example: 1, description: 'Subscriptions quantity' })
  readonly Subscriptions: number;
}
