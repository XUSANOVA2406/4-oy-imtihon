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
      durationMinutes: Number(dto.duration),

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
async getMovie(id: string, userId?: string) {
  const movie = await this.prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    throw new Error('Movie not found');
  }
  if (movie.subscriptionType === 'free') {
    return movie;
  }

  if (!userId) {
    throw new Error('Premium sotib olsangiz korolasiz');
  }

  const subscription = await this.prisma.userSubscription.findFirst({
    where: {
      userId: userId,
      status: 'active',
      endDate: {
        gt: new Date(),
      },
    },
  });

  if (!subscription) {
    throw new Error('Premium sotib olsangiz korolasiz');
  }

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