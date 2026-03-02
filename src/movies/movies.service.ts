import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}
async create(userId: string, dto: any) {
  return this.prisma.movie.create({
    data: {
      title: dto.title,
      description: dto.description,
      releaseYear: Number(dto.releaseYear),
      duration: Number(dto.duration),

      posterUrl: dto.posterUrl ?? null,
      subscriptionType: dto.subscriptionType ?? 'free',
      creator: {
        connect: { id: userId },
      },

  
      categories: {
        connect: dto.categoryIds.map((id: string) => ({ id })),
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
async getMovie(userId: string, id: string) {
  const movie = await this.prisma.movie.findUnique({
    where: { id },
    include: {
      categories: true,
    },
  });

  if (!movie) {
    throw new NotFoundException('Movie not found');
  }
  if (movie.subscriptionType === 'premium') {

    const subscription = await this.prisma.userSubscription.findFirst({
      where: {
        userId: userId,
        type: 'premium',
      },
    });

    if (!subscription) {
      throw new ForbiddenException('Kinoni korish uchun premium soitb oling');
    }
  }

  return movie;
}
  async deleteMovie(id: string, userId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) throw new NotFoundException('Movie not found');

    if (movie.createdBy !== userId)
      throw new ForbiddenException('Siz egasi emassiz');

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