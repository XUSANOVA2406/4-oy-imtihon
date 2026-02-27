import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Token required');

    const token = authHeader.split(' ')[1];

    try {
      const payload: any = jwt.verify(token, 'supersecretkey');
      request.user = {
        userId: payload.sub
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}