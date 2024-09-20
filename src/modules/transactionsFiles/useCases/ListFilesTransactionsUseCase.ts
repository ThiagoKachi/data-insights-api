import { IFilesTransactionRequest } from '../domain/models/IFilesTransactionRequest';
import { IFilesTransactionResponse } from '../domain/models/IFilesTransactionResponse';
import { ITransactionsFilesRepository } from '../domain/repositories/ITransactionsFilesRepository';

export class ListFilesTransactionsUseCase {
  constructor(private transactionsFilesRepository: ITransactionsFilesRepository) {}

  public async execute({
    userId,
    pageIndex = 1,
    pageSize = 20,
  }: IFilesTransactionRequest): Promise<IFilesTransactionResponse | undefined> {
    const transactions = await this.transactionsFilesRepository.listAllFiles({
      userId,
      pageIndex,
      pageSize,
    });

    return transactions;
  }
}
