import { ITransactionRequest } from '../domain/models/ITransactionRequest';
import { ITransactionResponse } from '../domain/models/ITransactionResponse';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';

export class ListTransactionsUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  public async execute({
    userId,
    pageIndex = 1,
    pageSize = 20,
    searchParams
  }: ITransactionRequest): Promise<ITransactionResponse | undefined> {
    const transactions = await this.transactionsRepository.listAll({
      userId,
      pageIndex,
      pageSize,
      searchParams
    });

    return transactions;
  }
}
