import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {

  @ApiProperty({ example: 'ali' })
  username: string;

  @ApiProperty({ example: 'ali@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}