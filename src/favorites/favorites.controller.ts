import { Controller, Post, Get, Delete, Param, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  private userId = '11111111-1111-1111-1111-111111111111';

  @Post(':movieId')
  add(@Param('movieId') movieId: string) {
    return this.favoritesService.addToFavorites(this.userId, movieId);
  }
  @Get()
  get() {
    return this.favoritesService.getFavorites(this.userId);
  }
  @Delete(':movieId')
  remove(@Req() req: any, @Param('movieId') movieId: string) {
  return this.favoritesService.removeFromFavorites(req.user.userId, movieId);
}
}