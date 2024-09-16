import { ICreateTransaction, ICreateTransactionResponse } from '../models/ICreateTransaction';

export interface ITransactionsRepository {
  create(data: ICreateTransaction): Promise<ICreateTransactionResponse>;
}
