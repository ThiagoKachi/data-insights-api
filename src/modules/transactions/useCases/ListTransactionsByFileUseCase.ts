import { AppError } from '@shared/errors/AppError';
import { ITransactionResponse } from '../domain/models/ITransactionResponse';
import { ITransactionsByFileRequest } from '../domain/models/ITransactionsByFileRequest';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';

export class ListTransactionsByFileUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  public async execute({
    id,
    userId,
    pageIndex = 1,
    pageSize = 20,
  }: ITransactionsByFileRequest): Promise<ITransactionResponse | undefined> {
    const file = await this.transactionsRepository.findFileById(id);

    if (!file) {
      throw new AppError('File not found', 404);
    }

    const transactions = await this.transactionsRepository.listByFile({
      id,
      userId,
      pageIndex,
      pageSize,
    });

    return transactions;
  }
}
