import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {

  @ApiProperty({
    example: 'Action',
    description: 'Kino kategoriyasi nomi',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name: string;

}