import { ICreateTransactionRequest } from '../models/ICreateTransactionRequest';
import { ITransaction } from '../models/ITransaction';
import { ITransactionReportRequest } from '../models/ITransactionReportRequest';
import { ITransactionReportResponse } from '../models/ITransactionReportResponse';
import { ITransactionRequest } from '../models/ITransactionRequest';
import { ITransactionResponse } from '../models/ITransactionResponse';
import { ITransactionResumeRequest } from '../models/ITransactionResumeRequest';
import { ITransactionResumeResponse } from '../models/ITransactionResumeResponse';
import { IUpdateTransactionRequest } from '../models/IUpdateTransactionRequest';

export interface ITransactionsRepository {
  create({
    transactionData,
    userId
  }: ICreateTransactionRequest): Promise<void>;
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
  getReport({
    userId,
    initialPeriod,
    finalPeriod
  }: ITransactionReportRequest): Promise<ITransactionReportResponse | undefined>;
  getResume({
    userId
  }: ITransactionResumeRequest): Promise<ITransactionResumeResponse | undefined>;
  findById(transactionId: string): Promise<ITransaction | undefined>;
  findManyById(transactionIds: string[]): Promise<ITransaction[] | undefined>;
  remove(transactionId: string, userId: string): Promise<void>;
  removeMany(transactionIds: string[], userId: string): Promise<void>;
}
