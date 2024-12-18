import { IsString, IsNumber } from 'class-validator';

export class TransactionDto {
  @IsString()
  senderAddress: string;

  @IsString()
  recipientAddress: string;

  @IsNumber()
  amount: number;
}
