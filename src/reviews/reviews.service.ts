import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, movieId: string, rating: number, comment?: string) {

    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) throw new NotFoundException('Kino topilmadi');

    return this.prisma.review.create({
      data: {
        userId,
        movieId,
        rating,
        comment,
      },
    });
  }

  async getMovieReviews(movieId: string) {
    return this.prisma.review.findMany({
      where: { movieId },
      include: {
        user: {
          select: { username: true },
        },
      },
    });
  }
}