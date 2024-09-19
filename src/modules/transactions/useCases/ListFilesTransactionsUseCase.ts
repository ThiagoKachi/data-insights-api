import { IFilesTransactionResponse } from '../domain/models/IFilesTransactionResponse';
import { ITransactionRequest } from '../domain/models/ITransactionRequest';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';

export class ListFilesTransactionsUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  public async execute({
    userId,
    pageIndex = 1,
    pageSize = 20,
  }: ITransactionRequest): Promise<IFilesTransactionResponse | undefined> {
    const transactions = await this.transactionsRepository.listAllFiles({
      userId,
      pageIndex,
      pageSize,
    });

    return transactions;
  }
}
