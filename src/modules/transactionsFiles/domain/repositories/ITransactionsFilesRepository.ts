import { ITransactionResponse } from '@modules/transactions/domain/models/ITransactionResponse';
import { ICreateFileRequest } from '../models/ICreateFileRequest';
import { ICreateFileResponse } from '../models/ICreateFileResponse';
import { IFiles } from '../models/IFiles';
import { IFilesTransactionRequest } from '../models/IFilesTransactionRequest';
import { IFilesTransactionResponse } from '../models/IFilesTransactionResponse';

export interface ITransactionsFilesRepository {
  listAllFiles({
    userId,
    pageIndex,
    pageSize,
  }: IFilesTransactionRequest): Promise<IFilesTransactionResponse | undefined>;
  listTransactionsByFile({
    id,
    userId,
    pageIndex,
    pageSize
  }: IFilesTransactionRequest): Promise<ITransactionResponse | undefined>;
  findFileById(fileId: string): Promise<IFiles | undefined>;
  createFile({
    userId,
    fileName,
    quantity
  }: ICreateFileRequest): Promise<ICreateFileResponse | undefined>
}
