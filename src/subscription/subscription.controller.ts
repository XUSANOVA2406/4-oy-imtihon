import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get('plans')
  getPlans() {
    return this.subscriptionService.getPlans();
  }

  @UseGuards(JwtAuthGuard)
  @Post('buy')
  buy(@Req() req: any, @Body() body: any) {
    return this.subscriptionService.buy(req.user.userId, body.planId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  mySub(@Req() req: any) {
    return this.subscriptionService.mySubscription(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  history(@Req() req: any) {
    return this.subscriptionService.history(req.user.userId);
}
}