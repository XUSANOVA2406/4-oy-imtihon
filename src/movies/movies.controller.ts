import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.moviesService.create(req.user.id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() body: any,
  ) {
    return this.moviesService.update(id, req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  myMovies(@Req() req: any) {
    return this.moviesService.myMovies(req.user.userId);
  }
}