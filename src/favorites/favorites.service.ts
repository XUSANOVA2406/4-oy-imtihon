import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async addToFavorites(userId: string, movieId: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    const existing = await this.prisma.favorite.findFirst({
      where: {
        userId,
        movieId,
      },
    });

    if (existing) {
      throw new BadRequestException('Already added to favorites');
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        movieId,
      },
    });
  }
  async getFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        movie: true,
      },
    });
  }
  async removeFromFavorites(userId: string, movieId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        movieId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.prisma.favorite.delete({
      where: { id: favorite.id },
    });

    return { message: 'Removed from favorites' };
  }
}