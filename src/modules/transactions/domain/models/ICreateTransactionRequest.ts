import { ICreateTransaction } from './ICreateTransaction';

export interface ICreateTransactionRequest {
  transactionData: ICreateTransaction[];
  userId: string;
  fileName?: string;
}
