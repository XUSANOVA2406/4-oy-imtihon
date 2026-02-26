import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}
  getPlans() {
    return this.prisma.subscriptionPlan.findMany();
  }

  async buyPlan(userId: string, planId: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new Error('Plan topilmadi');
    }
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationDays);

    await this.prisma.payment.create({
    data: {
        userId,
        amount: plan.price,
        status: 'paid',
    },
    });
    return this.prisma.userSubscription.create({
      data: {
        userId,
        planId,
        endDate,
      },
    });
  }
  async buy(userId: string, planId: string) {

  const plan = await this.prisma.subscriptionPlan.findUnique({
    where: { id: planId }
  });

  if (!plan) {
    throw new Error('Plan topilmadi');
  }

  // payment yozamiz
  await this.prisma.payment.create({
    data: {
      userId,
      amount: plan.price,
      status: 'PAID'
    }
  });

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.durationDays);

  return this.prisma.userSubscription.create({
    data: {
      userId,
      planId,
      startDate: new Date(),
      endDate
    }
  });
}
  async mySubscription(userId: string) {
    return this.prisma.userSubscription.findFirst({
      where: { userId },
      include: { plan: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async history(userId: string) {
    return this.prisma.userSubscription.findMany({
      where: { userId },
      include: { plan: true },
    });
  }
}