import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async addToFavorites(userId: string, movieId: string) {

    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) throw new NotFoundException('Movie not found');

    try {
      return await this.prisma.favorite.create({
        data: {
          userId,
          movieId,
        },
      });
    } catch {
      throw new BadRequestException('Already in favorites');
    }
  }
  async getFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        movie: true,
      },
    });
  }
  async removeFavorite(userId: string, movieId: string) {
    return this.prisma.favorite.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });
  }
}