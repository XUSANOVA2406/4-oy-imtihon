import { Controller, Post, Get, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':movieId')
  add(@Param('movieId') movieId: string, @Req() req: any) {
    return this.favoritesService.add(req.user.userId, movieId);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Req() req: any) {
    return this.favoritesService.getUserFavorites(req.user.userId);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':movieId')
  remove(@Param('movieId') movieId: string, @Req() req: any) {
    return this.favoritesService.remove(req.user.userId, movieId);
  }
}