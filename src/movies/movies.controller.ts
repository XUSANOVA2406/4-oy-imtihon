import { Controller, Get, Post, Delete, Param, Body, Req } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';

@ApiBearerAuth('access-token')
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.moviesService.getMovie(id);
  }

 @Post()
  create(@Req() req: any, @Body() body: CreateMovieDto) {
    const userId = req.user.userId;
    return this.moviesService.create(userId, body);
  }


  @Post()
  @ApiOperation({ summary: '' })
  createMovie(@Body() body: CreateMovieDto) {
    const userId = '11111111-1111-1111-1111-111111111111';
    return this.moviesService.create(userId, body);
  }
 
  @Post(':movieId/categories/:categoryId')
  addCategory(
  @Param('movieId') movieId: string,
  @Param('categoryId') categoryId: string,
) {
  return this.moviesService.addCategory(movieId, categoryId);
}
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    const userId = '11111111-1111-1111-1111-111111111111';
    return this.moviesService.deleteMovie(id, userId);
  }
}

