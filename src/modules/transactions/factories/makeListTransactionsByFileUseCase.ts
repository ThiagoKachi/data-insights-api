import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { ListTransactionsByFileUseCase } from '../useCases/ListTransactionsByFileUseCase';

export function makeListTransactionsByFileUseCase() {
  const transactionsRepository = new TransactionsRepository();

  return new ListTransactionsByFileUseCase(
    transactionsRepository,
  );
}
