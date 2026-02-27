import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {

  @ApiProperty({ example: "Kelinlar qo'zg'oloni" })
  @IsString()
  title: string;

  @ApiProperty({ example: "O'zbek oilalari haqida film" })
  @IsString()
  description: string;

  @ApiProperty({ example: 2019 })
  @IsInt()
  releaseYear: number;

  @ApiProperty({ example: 150 })
  @IsInt()
  duration: number;

  @ApiProperty({
    example: ["category-uuid-1", "category-uuid-2"],
    description: "Kino kategoriyalari IDlari",
  })
  @IsArray()
  @IsNotEmpty()
  categoryIds: string[];

  
}