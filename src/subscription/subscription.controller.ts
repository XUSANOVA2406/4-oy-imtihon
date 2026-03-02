import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BuySubscriptionDto } from './dto/buy-subscription.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private prisma: PrismaService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buy premium subscription' })
  @ApiBody({ type: BuySubscriptionDto })
  @UseGuards(JwtAuthGuard)
  @Post('buy')
  async buyPremium(
    @Req() req: any,
    @Body() dto: BuySubscriptionDto,
  ) {
    const userId = req.user.userId;

    return this.prisma.userSubscription.create({
      data: {
        userId,
        type: dto.type, 
      },
    });
  }
}