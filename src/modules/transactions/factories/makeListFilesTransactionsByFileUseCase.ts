import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { ListFilesTransactionsUseCase } from '../useCases/ListFilesTransactionsUseCase';

export function makeListFilesTransactionsUseCase() {
  const transactionsRepository = new TransactionsRepository();

  return new ListFilesTransactionsUseCase(
    transactionsRepository,
  );
}
