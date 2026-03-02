import { ApiProperty } from '@nestjs/swagger';

export class BuySubscriptionDto {

  @ApiProperty({
    example: 'premium',
    description: 'Subscription turi: (free yoki premium)',
  })
  type: string;
}