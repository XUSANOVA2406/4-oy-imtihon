import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({ example: 'ali@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}