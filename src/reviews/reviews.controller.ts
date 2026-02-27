import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
@UseGuards(JwtAuthGuard)
@Post(':movieId')
@ApiBody({ type: CreateReviewDto })
create(
  @Param('movieId') movieId: string,
  @Req() req: any,
  @Body() body: CreateReviewDto,
) {
  return this.reviewsService.create(
    req.user.userId,
    movieId,
    body.rating,
    body.comment,
  );
}
  @Get(':movieId')
  getMovieReviews(@Param('movieId') movieId: string) {
    return this.reviewsService.getMovieReviews(movieId);
  }
}