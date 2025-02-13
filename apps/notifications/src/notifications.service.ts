import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAUTH2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('SMTP_ID'),
      clientSecret: this.configService.get('SMTP_SECRET'),
      refreshToken: this.configService.get('SMTP_REFRESH_TOKEN'),
    }
  });

  async notifyEmail({ email }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Sleepr Reservation',
      text: 'Success!'
    });
  }
}
