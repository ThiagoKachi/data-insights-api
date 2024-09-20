import { TransactionsFilesRepository } from '../infra/database/repositories/TransactionsFilesRepository';
import { ListFilesTransactionsUseCase } from '../useCases/ListFilesTransactionsUseCase';

export function makeListFilesTransactionsUseCase() {
  const transactionsFilesRepository = new TransactionsFilesRepository();

  return new ListFilesTransactionsUseCase(
    transactionsFilesRepository,
  );
}
