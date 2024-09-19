import { ICreateFileResponse } from '../models/ICreateFileResponse';
import { ICreateTransaction } from '../models/ICreateTransaction';
import { IFiles } from '../models/IFiles';
import { IFilesTransactionResponse } from '../models/IFilesTransactionResponse';
import { ITransaction } from '../models/ITransaction';
import { ITransactionRequest } from '../models/ITransactionRequest';
import { ITransactionResponse } from '../models/ITransactionResponse';
import { ITransactionsByFileRequest } from '../models/ITransactionsByFileRequest';
import { IUpdateTransaction } from '../models/IUpdateTransaction';

export interface ICreateTransactionRequest {
  transactionData: ICreateTransaction[];
  userId: string;
  fileName?: string;
}

export interface IUpdateTransactionRequest {
  id: string;
  transactionData: IUpdateTransaction;
  userId: string;
}

export interface ITransactionsRepository {
  create({
    transactionData,
    userId
  }: ICreateTransactionRequest): Promise<void>;
  createFile(fileName: string, userId: string): Promise<ICreateFileResponse | undefined>;
  update({
    id,
    transactionData,
    userId
  }: IUpdateTransactionRequest): Promise<void>;
  listAll({
    userId,
    pageIndex,
    pageSize,
    searchParams
  }: ITransactionRequest): Promise<ITransactionResponse | undefined>;
  listAllFiles({
    userId,
    pageIndex,
    pageSize,
  }: ITransactionRequest): Promise<IFilesTransactionResponse | undefined>;
  listByFile({
    id,
    userId,
    pageIndex,
    pageSize
  }: ITransactionsByFileRequest): Promise<ITransactionResponse | undefined>;
  findById(transactionId: string): Promise<ITransaction | undefined>;
  findFileById(fileId: string): Promise<IFiles | undefined>;
  findManyById(transactionIds: string[]): Promise<ITransaction[] | undefined>;
  remove(transactionId: string, userId: string): Promise<void>;
  removeMany(transactionIds: string[], userId: string): Promise<void>;
}
