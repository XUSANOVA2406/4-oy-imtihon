import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { StringValue } from 'ms';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
  PrismaModule,
  PassportModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET as string,
    signOptions: { expiresIn: process.env.JWT_EXPIRES as any },
  }),
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,RolesGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}