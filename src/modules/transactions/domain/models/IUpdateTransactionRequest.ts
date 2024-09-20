import { IUpdateTransaction } from './IUpdateTransaction';

export interface IUpdateTransactionRequest {
  id: string;
  transactionData: IUpdateTransaction;
  userId: string;
}
