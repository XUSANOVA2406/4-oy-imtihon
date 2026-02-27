import { Controller, Get, Patch, Body, Req } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@Req() req: any) {
    return this.usersService.getProfile(req.user?.userId);
  }

  @Patch('me')
  update(@Req() req: any, @Body() body: any) {
    return this.usersService.updateProfile(req.user?.userId, body);
  }
}