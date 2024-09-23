import { ICreateTransactionRequest } from '@modules/transactions/domain/models/ICreateTransactionRequest';
import { ITransaction } from '@modules/transactions/domain/models/ITransaction';
import { ITransactionReportRequest } from '@modules/transactions/domain/models/ITransactionReportRequest';
import { ITransactionReportResponse } from '@modules/transactions/domain/models/ITransactionReportResponse';
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

  public async getReport({
    userId,
    initialPeriod,
    finalPeriod
  }: ITransactionReportRequest): Promise<ITransactionReportResponse | undefined> {
    const transactions = await this
      .knexClient('financial_transactions')
      .where('user_id', userId)
      .andWhereBetween(
        'transaction_date',
        [convertDateToUSFormat(initialPeriod), convertDateToUSFormat(finalPeriod)]
      );

    const transactionsFormated = transactions.map((transaction) => {
      return {
        date: transaction.transaction_date.toISOString(),
        description: transaction.description,
        type: transaction.type,
        value: transaction.value,
        payment_method: transaction.payment_method,
      };
    });

    const taxes = transactions.map((tax) => {
      if (tax.taxes) {
        return {
          date: tax.transaction_date.toISOString(),
          transaction_value: tax.value,
          taxes: tax.taxes,
        };
      } else {
        return null;
      }
    }).filter((tax) => tax !== null);

    const expenses = transactions
      .filter((transaction) => transaction.type === 'outcome')
      .map((t) => {return { ...t, value: Number(t.value)};});
    const revenues = transactions
      .filter((transaction) => transaction.type === 'income')
      .map((t) => {return { ...t, value: Number(t.value)};});

    const revenuesFormated = revenues.map((transaction) => {
      return {
        date: transaction.transaction_date.toISOString(),
        entity: transaction.entity,
        description: transaction.description,
        value: transaction.value,
        payment_method: transaction.payment_method,
      };
    });

    const expensesFormated = expenses.map((transaction) => {
      return {
        date: transaction.transaction_date.toISOString(),
        entity: transaction.entity,
        description: transaction.description,
        value: transaction.value,
        payment_method: transaction.payment_method,
      };
    });

    function finalBalanceFormated() {
      const revenue = revenues.reduce((acc, cur) => acc + Number(cur.value), 0);
      const expense = expenses.reduce((acc, cur) => acc + Number(cur.value), 0);

      return parseFloat((revenue - expense).toFixed(2));
    }

    const totalExpensesFormated = expenses.reduce((acc, cur) => acc + cur.value, 0);
    const totalRevenuesFormated = revenues.reduce((acc, cur) => acc + cur.value, 0);
    const totalTaxesFormated = taxes.reduce((acc, cur) => acc + Number(cur.taxes), 0);

    return {
      initialPeriod: initialPeriod,
      finalPeriod: finalPeriod,
      expenses: expensesFormated,
      revenues: revenuesFormated,
      taxes: taxes.length > 0 ? taxes : null,
      transactions: transactionsFormated,
      totalExpenses: parseFloat((totalExpensesFormated).toFixed(2)),
      totalRevenue: parseFloat((totalRevenuesFormated).toFixed(2)),
      finalBalance: finalBalanceFormated(),
      totalTaxes: parseFloat((totalTaxesFormated).toFixed(2)),
    };
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
