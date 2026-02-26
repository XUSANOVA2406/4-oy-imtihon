import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async add(userId: string, movieId: string) {
    return this.prisma.favorite.create({
      data: {
        userId,
        movieId,
      },
    });
  }
  async getUserFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        movie: true,
      },
    });
  }
  async remove(userId: string, movieId: string) {
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