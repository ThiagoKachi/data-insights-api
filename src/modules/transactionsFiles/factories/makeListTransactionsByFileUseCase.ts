import { TransactionsFilesRepository } from '../infra/database/repositories/TransactionsFilesRepository';
import { ListTransactionsByFileUseCase } from '../useCases/ListTransactionsByFileUseCase';

export function makeListTransactionsByFileUseCase() {
  const transactionsFilesRepository = new TransactionsFilesRepository();

  return new ListTransactionsByFileUseCase(
    transactionsFilesRepository,
  );
}
