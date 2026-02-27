import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  releaseYear: number;

  @ApiProperty()
  duration: number;

  @ApiProperty({ type: [String] })
  categoryIds: string[];

  @ApiProperty({ required: false })
  posterUrl?: string;

  @ApiProperty({ required: false, default: 'free' })
  subscriptionType?: string;
}