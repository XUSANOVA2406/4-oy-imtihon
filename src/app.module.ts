import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [AuthModule,PrismaModule,MoviesModule,SubscriptionModule,UsersModule,FavoritesModule,],
})
export class AppModule {}