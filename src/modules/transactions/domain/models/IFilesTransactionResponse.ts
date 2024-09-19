
import { IFiles } from './IFiles';
import { IPagination } from './IPagination';

export interface IFilesTransactionResponse {
  data: IFiles[];
  pagination: IPagination;
}
