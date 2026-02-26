import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.movie.findMany({
      include: {
        creator: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: { creator: true },
    });
  }

  async create(userId: string, data: any) {
    return this.prisma.movie.create({
      data: {
        title: data.title,
        description: data.description,
        releaseYear: data.releaseYear,
        creator: {
          connect: { id: userId },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
  async update(id: string, userId: string, data: any) {
  const movie = await this.prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) throw new Error('Kino topilmadi');

  if (movie.creatorId !== userId)
    throw new Error('Faqat egasi tahrirlaydi');

  return this.prisma.movie.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      releaseYear: data.releaseYear,
    },
  });
}

  async myMovies(userId: string) {
    return this.prisma.movie.findMany({
      where: {
        creatorId: userId,
      },
    });
  }
}