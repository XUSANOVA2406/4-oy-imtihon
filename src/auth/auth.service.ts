import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string) {

    const userExists = await this.prisma.user.findFirst({
      where: { email },
    });

    if (userExists)
      throw new BadRequestException('User already exists');

    const hash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        role: 'user',
      },
    });

    return { message: 'User created', userId: user.id };
  }
  async login(email: string, password: string) {

  const user = await this.prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== password) {
    throw new Error('Wrong password');
  }

  const payload = { userId: user.id };

  return {
    access_token: this.jwtService.sign(payload),
  };
}}