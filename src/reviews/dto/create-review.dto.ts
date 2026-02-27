import { ApiProperty } from '@nestjs/swagger'

export class CreateReviewDto {

  @ApiProperty({ example: 5 })
  rating: number;

  @ApiProperty({ example: "Juda zo'r film!" })
  comment: string;
}