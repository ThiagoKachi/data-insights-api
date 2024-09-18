import { ICreateTransaction } from '../models/ICreateTransaction';
import { ITransaction } from '../models/ITransaction';

export interface ICreateTransactionRequest {
  transactionData: ICreateTransaction[];
  userId: string;
}

export interface ITransactionsRepository {
  create({
    transactionData,
    userId
  }: ICreateTransactionRequest): Promise<void>;
  findById(transactionId: string): Promise<ITransaction | undefined>;
  findManyById(transactionIds: string[]): Promise<ITransaction[] | undefined>;
  remove(transactionId: string, userId: string): Promise<void>;
  removeMany(transactionIds: string[], userId: string): Promise<void>;
}
