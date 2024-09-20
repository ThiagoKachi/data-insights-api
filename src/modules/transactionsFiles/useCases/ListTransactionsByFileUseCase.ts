import { ITransactionResponse } from '@modules/transactions/domain/models/ITransactionResponse';
import { AppError } from '@shared/errors/AppError';
import { ITransactionsByFileRequest } from '../domain/models/ITransactionsByFileRequest';
import { ITransactionsFilesRepository } from '../domain/repositories/ITransactionsFilesRepository';

export class ListTransactionsByFileUseCase {
  constructor(private transactionsFilesRepository: ITransactionsFilesRepository) {}

  public async execute({
    id,
    userId,
    pageIndex = 1,
    pageSize = 20,
  }: ITransactionsByFileRequest): Promise<ITransactionResponse | undefined> {
    const file = await this.transactionsFilesRepository.findFileById(id);

    if (!file) {
      throw new AppError('File not found', 404);
    }

    const transactions = await this.transactionsFilesRepository.listTransactionsByFile({
      id,
      userId,
      pageIndex,
      pageSize,
    });

    return transactions;
  }
}
