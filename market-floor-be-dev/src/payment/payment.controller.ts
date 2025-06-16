import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentRecordDto, CreatePaymentUrlDto } from './payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/create-url')
  createPaymentUrl(@Body() body: CreatePaymentUrlDto) {
    return this.paymentService.createPaymentUrl(body);
  }

  @Get('/vnpay-bank-list')
  async getVNPayBankList() {
    return await this.paymentService.geVNPaytBankList();
  }

  @Post('/verify')
  async verifyPayment(@Query() query: CreatePaymentRecordDto) {
    return this.paymentService.verifyPayment(query);
  }

  @Post('/create-record')
  async createPaymentRecord(
    @Req() req: Request,
    @Body() payload: CreatePaymentRecordDto,
  ) {
    return this.paymentService.createPaymentRecord(payload);
  }
}
