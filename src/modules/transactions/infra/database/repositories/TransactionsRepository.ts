import { ICreateTransactionRequest, ITransactionsRepository } from '@modules/transactions/domain/repositories/ITransactionsRepository';
import { knex } from '@shared/infra/libs/knex';
import { Knex } from 'knex';

export class TransactionsRepository implements ITransactionsRepository {
  private knexClient: Knex;

  constructor() {
    this.knexClient = knex;
  }

  public async create({
    transactionData,
    userId
  }: ICreateTransactionRequest): Promise<void> {
    const data = transactionData.map((fin) => ({ ...fin, user_id: userId }));

    await this.knexClient('financial_transactions').insert(data);
  }
}
