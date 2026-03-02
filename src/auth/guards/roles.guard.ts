import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    console.log('REQ.USER => ', request.user);
    console.log('REQUIRED ROLES => ', requiredRoles);

    if (!requiredRoles) return true;

    const user = request.user;
    if (!user) return false;

    return requiredRoles.includes(user.role);
  }
}