import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import axios from 'axios';

@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private etherscanApiKey: string;
  private etherscanBaseUrl: string;

  constructor() {
    const rpcUrl = process.env.ETHEREUM_RPC_URL || 'http://127.0.0.1:8545';
    this.provider = new ethers.JsonRpcProvider(rpcUrl);

    this.etherscanApiKey =
      process.env.ETHERSCAN_API_KEY || 'YourEtherscanApiKey';
    this.etherscanBaseUrl =
      process.env.ETHERSCAN_API_BASEURL || 'https://api.etherscan.io/api';
  }

  async createWallet() {
    const wallet = ethers.Wallet.createRandom();
    return { address: wallet.address, privateKey: wallet.privateKey };
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    console.log('balance', balance);
    return ethers.formatEther(balance);
  }

  async sendTransaction(
    privateKey: string,
    recipient: string,
    amount: string,
  ): Promise<string> {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const tx = await wallet.sendTransaction({
      to: recipient,
      value: ethers.parseEther(amount),
    });
    await tx.wait();
    return tx.hash;
  }

  async getTransactionHistory(address: string): Promise<any[]> {
    const url = `${this.etherscanBaseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${this.etherscanApiKey}`;

    try {
      const response = await axios.get(url);
      const transactions = response.data.result;

      if (response.data.status !== '1') {
        throw new Error('Failed to fetch transactions from Etherscan');
      }

      return transactions.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.formatEther(tx.value),
        timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
        blockNumber: tx.blockNumber,
      }));
    } catch (error) {
      console.error('Error fetching transaction history:', error.message);
      throw new Error('Unable to retrieve transaction history');
    }
  }
}
