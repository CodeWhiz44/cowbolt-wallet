import { Injectable } from '@nestjs/common';
import { BlockchainService } from './blockchain/blockchain.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { Transaction } from './transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    private blockchainService: BlockchainService,
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createWallet(username: string) {
    const existingWallet = await this.walletRepository.findOne({
      where: { username },
    });

    if (existingWallet) {
      return existingWallet;
    }
    const blockchainWallet = await this.blockchainService.createWallet();
    const wallet = this.walletRepository.create({
      username,
      address: blockchainWallet.address,
      privateKey: blockchainWallet.privateKey,
    });

    return this.walletRepository.save(wallet);
  }

  async getBalance(address: string): Promise<string> {
    return await this.blockchainService.getBalance(address);
  }

  async sendTransaction(
    senderPrivateKey: string,
    recipientAddress: string,
    amount: string,
  ): Promise<string> {
    const txHash = await this.blockchainService.sendTransaction(
      senderPrivateKey,
      recipientAddress,
      amount,
    );

    const transaction = this.transactionRepository.create({
      hash: txHash,
      amount: parseFloat(amount),
      sender: await this.walletRepository.findOne({
        where: { privateKey: senderPrivateKey },
      }),
      recipient: await this.walletRepository.findOne({
        where: { address: recipientAddress },
      }),
    });

    await this.transactionRepository.save(transaction);
    return txHash;
  }

  async getTransactionHistory(address: string): Promise<any[]> {
    return await this.blockchainService.getTransactionHistory(address);
  }
}
