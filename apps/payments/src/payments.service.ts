import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY')!,
    {
      apiVersion: '2025-01-27.acacia'
    }
  );

  constructor(
    private readonly configService: ConfigService,
    /* @ts-ignore */
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationService: ClientProxy
  ) {};

  async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
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
    this.notificationService.emit('notify-email', { email });

    return paymentIntent;
  }
}
