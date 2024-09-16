import { ICreateTransaction, ICreateTransactionResponse } from '@modules/transactions/domain/models/ICreateTransaction';
import { ITransactionsRepository } from '@modules/transactions/domain/repositories/ITransactionsRepository';
import { knex } from '@shared/infra/libs/knex';
import { Knex } from 'knex';

export class TransactionsRepository implements ITransactionsRepository {
  private knexClient: Knex;

  constructor() {
    this.knexClient = knex;
  }

  public async create(userData: ICreateTransaction): Promise<ICreateTransactionResponse> {
    await this.knexClient('transactions').insert(userData);

    return {} as ICreateTransactionResponse;
  }
}
