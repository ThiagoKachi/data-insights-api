import { ICreateTransactionRequest } from '@modules/transactions/domain/models/ICreateTransactionRequest';
import { ITransaction } from '@modules/transactions/domain/models/ITransaction';
import { ITransactionRequest } from '@modules/transactions/domain/models/ITransactionRequest';
import { ITransactionResponse } from '@modules/transactions/domain/models/ITransactionResponse';
import { IUpdateTransactionRequest } from '@modules/transactions/domain/models/IUpdateTransactionRequest';
import { ITransactionsRepository } from '@modules/transactions/domain/repositories/ITransactionsRepository';
import { knex } from '@shared/infra/libs/knex';
import { convertDateToUSFormat } from '@shared/utils/formatDate';
import { Knex } from 'knex';

export class TransactionsRepository implements ITransactionsRepository {
  private knexClient: Knex;

  constructor() {
    this.knexClient = knex;
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
