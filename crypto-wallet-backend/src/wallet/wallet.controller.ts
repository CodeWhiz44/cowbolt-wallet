import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(@Body() { username }: { username: string }) {
    return await this.walletService.createWallet(username);
  }

  @Get(':address/balance')
  async getBalance(@Param('address') address: string) {
    return await this.walletService.getBalance(address);
  }

  @Post('transaction')
  async sendTransaction(
    @Body()
    dto: {
      senderPrivateKey: string;
      recipientAddress: string;
      amount: string;
    },
  ) {
    return await this.walletService.sendTransaction(
      dto.senderPrivateKey,
      dto.recipientAddress,
      dto.amount,
    );
  }

  @Get(':address/transactions')
  async getTransactionHistory(@Param('address') address: string) {
    return await this.walletService.getTransactionHistory(address);
  }
}
