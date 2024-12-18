import { IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  username: string;
}
