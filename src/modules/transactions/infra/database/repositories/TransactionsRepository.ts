import { ITransaction } from '@modules/transactions/domain/models/ITransaction';
import { ICreateTransactionRequest, ITransactionsRepository } from '@modules/transactions/domain/repositories/ITransactionsRepository';
import { knex } from '@shared/infra/libs/knex';
import { Knex } from 'knex';

export class TransactionsRepository implements ITransactionsRepository {
  private knexClient: Knex;

  constructor() {
    this.knexClient = knex;
  }

  public async findManyById(transactionIds: string[]): Promise<ITransaction[] | undefined> {
    const transactions = await this
      .knexClient('financial_transactions')
      .whereIn('id', transactionIds);

    return transactions;
  }

  public async findById(transactionId: string): Promise<ITransaction | undefined> {
    const transaction = await this
      .knexClient('financial_transactions')
      .where('id', transactionId)
      .first();

    return transaction;
  }

  public async create({
    transactionData,
    userId
  }: ICreateTransactionRequest): Promise<void> {
    const data = transactionData.map((fin) => ({ ...fin, user_id: userId }));

    await this.knexClient('financial_transactions').insert(data);
  }

  public async remove(transactionId: string, userId: string): Promise<void> {
    await this
      .knexClient('financial_transactions')
      .where('user_id', userId)
      .andWhere('id', transactionId)
      .delete();
  }

  public async removeMany(transactionIds: string[], userId: string): Promise<void> {
    await this
      .knexClient('financial_transactions')
      .where('user_id', userId)
      .whereIn('id', transactionIds)
      .delete();
  }
}
