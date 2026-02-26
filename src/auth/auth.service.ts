import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
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

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email allaqachon mavjud');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "you registered successfullt",
      data: {
        user_id: user.id,
        username: user.username,
        role: user.role,
        created_at: user.createdAt,
      },
    };
  }

  async login(email: string, password: string) {

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email yoki parol xato');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email yoki parol xato');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });

    return {
      success: true,
      message: 'Muvaffaqiyatli kirildi',
      access_token: token,
    };
  }
}