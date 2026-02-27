import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

// @Roles('admin') yozish uchun decorator
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);