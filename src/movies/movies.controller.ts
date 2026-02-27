import {Controller,Get, Post,Delete,Param,  Body,Req, UseGuards,} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }
 @UseGuards(JwtAuthGuard)
@Get(':id')
getMovie(@Req() req: any, @Param('id') id: string) {
  const userId = req.user?.userId;
  return this.moviesService.getMovie(id, userId);
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post()
  @ApiOperation({ summary: '' })
  create(@Req() req: any, @Body() body: CreateMovieDto) {
    const userId = req.user.userId;
    return this.moviesService.create(userId, body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post(':movieId/categories/:categoryId')
  addCategory(
    @Param('movieId') movieId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.moviesService.addCategory(movieId, categoryId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Delete(':id')
  deleteMovie(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.moviesService.deleteMovie(id, userId);
  }
}