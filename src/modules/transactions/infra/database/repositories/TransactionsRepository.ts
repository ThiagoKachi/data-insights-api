import { ICreateFileResponse } from '@modules/transactions/domain/models/ICreateFileResponse';
import { IFiles } from '@modules/transactions/domain/models/IFiles';
import { IFilesTransactionResponse } from '@modules/transactions/domain/models/IFilesTransactionResponse';
import { ITransaction } from '@modules/transactions/domain/models/ITransaction';
import { ITransactionRequest } from '@modules/transactions/domain/models/ITransactionRequest';
import { ITransactionResponse } from '@modules/transactions/domain/models/ITransactionResponse';
import { ITransactionsByFileRequest } from '@modules/transactions/domain/models/ITransactionsByFileRequest';
import {
  ICreateTransactionRequest,
  ITransactionsRepository,
  IUpdateTransactionRequest,
} from '@modules/transactions/domain/repositories/ITransactionsRepository';
import { knex } from '@shared/infra/libs/knex';
import { convertDateToUSFormat } from '@shared/utils/formatDate';
import { Knex } from 'knex';

export class TransactionsRepository implements ITransactionsRepository {
  private knexClient: Knex;

  constructor() {
    this.knexClient = knex;
  }

  public async findFileById(fileId: string): Promise<IFiles | undefined> {
    const file = await this.knexClient('files')
      .where('id', fileId)
      .first();

    return file;
  }

  public async listAll({
    userId,
    pageIndex,
    pageSize,
    searchParams,
  }: ITransactionRequest): Promise<ITransactionResponse | undefined> {
    const transactions = await this.knexClient('financial_transactions')
      .where('user_id', userId)
      .modify((qb) => {
        if (searchParams?.initial_date && searchParams?.final_date) {
          qb.where(
            'transaction_date',
            '>=',
            convertDateToUSFormat(searchParams?.initial_date)
          ).where(
            'transaction_date',
            '<=',
            convertDateToUSFormat(searchParams?.final_date)
          );
        }

        const searchParamsWithouDates = {
          ...searchParams,
          initial_date: undefined,
          final_date: undefined,
        };

        Object.entries(searchParamsWithouDates || {}).forEach(
          ([key, value]) => {
            if (value) {
              qb.where(key, value);
            }
          }
        );
      })
      .paginate({ perPage: pageSize, currentPage: pageIndex });

    return transactions;
  }

  public async listByFile({
    id,
    userId,
    pageIndex,
    pageSize
  }: ITransactionsByFileRequest): Promise<ITransactionResponse | undefined> {
    const transactions = await this
      .knexClient('financial_transactions')
      .where('user_id', userId)
      .andWhere('file_id', id)
      .paginate({ perPage: pageSize, currentPage: pageIndex });

    return transactions;
  }

  public async listAllFiles({
    userId,
    pageIndex,
    pageSize
  }: ITransactionsByFileRequest): Promise<IFilesTransactionResponse | undefined> {
    const filesTransactions = await this
      .knexClient('files')
      .where('user_id', userId)
      .paginate({ perPage: pageSize, currentPage: pageIndex });

    return filesTransactions;
  }

  public async findManyById(
    transactionIds: string[]
  ): Promise<ITransaction[] | undefined> {
    const transactions = await this.knexClient(
      'financial_transactions'
    ).whereIn('id', transactionIds);

    return transactions;
  }

  public async findById(
    transactionId: string
  ): Promise<ITransaction | undefined> {
    const transaction = await this.knexClient('financial_transactions')
      .where('id', transactionId)
      .first();

    return transaction;
  }

  public async create({
    transactionData,
    userId,
  }: ICreateTransactionRequest): Promise<void> {
    const data = transactionData.map((fin) => ({ ...fin, user_id: userId }));

    await this.knexClient('financial_transactions').insert(data);
  }

  public async createFile(
    fileName: string,
    userId: string
  ): Promise<ICreateFileResponse | undefined> {
    const [data] = await this
      .knexClient('files')
      .insert({ file_name: fileName, user_id: userId })
      .returning('*');

    return data;
  }

  public async update({
    id,
    transactionData,
    userId,
  }: IUpdateTransactionRequest): Promise<void> {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

    await this.knexClient('financial_transactions')
      .where('id', id)
      .andWhere('user_id', userId)
      .update({ ...transactionData, updated_at: threeHoursAgo });
  }

  public async remove(transactionId: string, userId: string): Promise<void> {
    await this.knexClient('financial_transactions')
      .where('user_id', userId)
      .andWhere('id', transactionId)
      .delete();
  }

  public async removeMany(
    transactionIds: string[],
    userId: string
  ): Promise<void> {
    await this.knexClient('financial_transactions')
      .where('user_id', userId)
      .whereIn('id', transactionIds)
      .delete();
  }
}
