import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY')!,
    {
      apiVersion: '2025-01-27.acacia'
    }
  );

  constructor(private readonly configService: ConfigService) {};

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd'
    });

    return paymentIntent;
  }
}
