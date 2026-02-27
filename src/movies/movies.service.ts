import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}
async create(userId: string, dto: CreateMovieDto) {
  return this.prisma.movie.create({
    data: {
      title: dto.title,
      description: dto.description,
      releaseYear: dto.releaseYear,
      duration: dto.duration,
      createdBy: userId,

      categories: {
        connect: dto.categoryIds.map((id) => ({ id })),
      },
    },
    include: {
      categories: true,
    },
  });
}
  async getAllMovies() {
    return this.prisma.movie.findMany({
      include: {
        creator: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
  async getMovie(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }
  async deleteMovie(id: string, userId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) throw new NotFoundException('Movie not found');

    if (movie.createdBy !== userId)
      throw new ForbiddenException('You are not owner');

    return this.prisma.movie.delete({
      where: { id },
    });
  }
  async addCategory(movieId: string, categoryId: string) {
  return this.prisma.movie.update({
    where: { id: movieId },
    data: {
      categories: {
        connect: { id: categoryId },
      },
    },
    include: {
      categories: true,
    },
  });
}
}