import { ICreateTransaction } from '../models/ICreateTransaction';

export interface ICreateTransactionRequest {
  transactionData: ICreateTransaction[];
  userId: string;
}

export interface ITransactionsRepository {
  create({
    transactionData,
    userId
  }: ICreateTransactionRequest): Promise<void>;
}
