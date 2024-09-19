
import { IPagination } from './IPagination';
import { ITransaction } from './ITransaction';

export interface ITransactionResponse {
  data: ITransaction[];
  pagination: IPagination;
}
