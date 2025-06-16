import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { VnpayService } from 'nestjs-vnpay';
import { dateFormat, ProductCode, VnpLocale } from 'vnpay';
import { Repository } from 'typeorm';
import { CreatePaymentRecordDto, CreatePaymentUrlDto } from './payment.dto';
import { Payment } from 'src/entities/payment.entity';
import * as qs from 'qs';

import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  constructor(
    private vnpayService: VnpayService,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    private configService: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private toQueryString(payload: any): string {
    return new URLSearchParams(payload as Record<string, string>).toString();
  }

  async geVNPaytBankList() {
    return this.vnpayService.getBankList();
  }

  async createPaymentUrl(payload: CreatePaymentUrlDto) {
    const { amount } = payload;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const ipAddress =
      this.request.headers['x-forwarded-for'] ||
      this.request.connection.remoteAddress ||
      this.request.socket.remoteAddress ||
      (this.request.connection as any).socket.remoteAddress;

    try {
      const paymentUrl = this.vnpayService.buildPaymentUrl({
        vnp_Amount: amount,
        vnp_IpAddr: ipAddress || '13.160.92.202',
        vnp_TxnRef: `ORDER_${Date.now()}`,
        vnp_OrderInfo: `Thanh toan don hang`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: this.configService.get('VNPAY_RETURN_URL'),
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(tomorrow),
      });
      return paymentUrl;
    } catch (error) {
      console.log('error when try to create payment url', error);
    }
  }

  async verifyPayment(query: CreatePaymentRecordDto) {
    const secureHashFromVnpay = query.vnp_SecureHash;
    const responseCode = query.vnp_ResponseCode;
    const transactionStatus = query.vnp_TransactionStatus;
    const sortedParams: { [key: string]: string } = {};
    const excludeKeys = ['vnp_SecureHash', 'vnp_SecureHashType'];

    // Convert DTO to plain object for iteration
    const rawQueryParams = JSON.parse(JSON.stringify(query));

    for (const key in rawQueryParams) {
      if (rawQueryParams.hasOwnProperty(key) && !excludeKeys.includes(key)) {
        // VNPAY yêu cầu encodeURIComponent cho giá trị (không phải key)
        // và thay thế '%20' bằng '+'
        // và không encode dấu '
        sortedParams[key] = encodeURIComponent(rawQueryParams[key]).replace(
          /%20/g,
          '+',
        );
      }
    }

    // 2. Sắp xếp các tham số theo thứ tự alphabet
    const keys = Object.keys(sortedParams).sort();

    // 3. Tạo chuỗi dữ liệu (query string)
    let hashData = '';
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      hashData += key + '=' + sortedParams[key];
      if (i < keys.length - 1) {
        hashData += '&';
      }
    }

    // 4. Ghép với Secret Key

    const secretKey = process.env.VNPAY_HASH_SECRET;
    const hmac = crypto.createHmac('sha512', secretKey); // VNPAY thường dùng SHA512 cho SecureHash
    const calculatedHash = hmac.update(hashData).digest('hex');
    if (calculatedHash !== secureHashFromVnpay) {
      return {
        status: 'fail',
        message: '❌ Sai chữ ký. Dữ liệu không hợp lệ.',
      };
    }

    // 6. Kiểm tra mã phản hồi
    if (responseCode !== '00') {
      return {
        status: 'fail',
        message: `❌ Giao dịch bị từ chối bởi VNPAY. Mã lỗi: ${responseCode}`,
      };
    }

    // 7. Kiểm tra trạng thái giao dịch
    if (transactionStatus !== '00') {
      return {
        status: 'fail',
        message: `❌ Giao dịch không thành công từ phía ngân hàng. Trạng thái: ${transactionStatus}`,
      };
    }
    return {
      status: 'success',
      message: '✅ Giao dịch thành công.',
      data: {
        amount: query.vnp_Amount,
        orderId: query.vnp_TxnRef,
        bankCode: query.vnp_BankCode,
        transactionNo: query.vnp_TransactionNo,
      },
    };
  }

  async createPaymentRecord(payload: CreatePaymentRecordDto) {
    try {
      const newPaymentRecord = await this.paymentRepo.create({
        orderId: Number(payload.vnp_TxnRef),
        isSuccess: payload.vnp_TransactionStatus == '00',
        paymentInfo: {
          ...payload,
        },
      });
      return await this.paymentRepo.save(newPaymentRecord);
    } catch (error) {
      console.log('Server cannot save user order payment info', error);
    }
  }
}
