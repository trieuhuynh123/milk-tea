import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePaymentUrlDto {
  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;
}

export class CreatePaymentRecordDto {
  @IsString({ message: 'vnp_Amount is required' })
  vnp_Amount: string;

  @IsString({ message: 'vnp_BankCode is required' })
  vnp_BankCode: string;

  @IsOptional()
  @IsString({ message: 'vnp_BankTranNo must be a string' })
  vnp_BankTranNo?: string;

  @IsOptional()
  @IsString({ message: 'vnp_CardType must be a string' })
  vnp_CardType?: string;

  @IsOptional()
  @IsString({ message: 'vnp_OrderInfo must be a string' })
  vnp_OrderInfo?: string;

  @IsOptional()
  @IsString({})
  vnp_PayDate?: string;

  @IsOptional()
  @IsString({ message: 'vnp_ResponseCode must be a string' })
  vnp_ResponseCode?: string;

  @IsOptional()
  @IsString({ message: 'vnp_TmnCode must be a string' })
  vnp_TmnCode?: string;

  @IsOptional()
  @IsString({ message: 'vnp_TransactionNo must be a string' })
  vnp_TransactionNo?: string;

  @IsOptional()
  @IsString({ message: 'vnp_TransactionStatus must be a string' })
  vnp_TransactionStatus?: string;

  @IsOptional()
  @IsString({ message: 'vnp_TxnRef must be a string' })
  vnp_TxnRef?: string;

  @IsOptional()
  @IsString({ message: 'vnp_SecureHash must be a string' })
  vnp_SecureHash?: string;

  @IsOptional()
  @IsString({ message: 'vnp_SecureHashType must be a string' })
  vnp_SecureHashType?: string;
}
