import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { ListTransactionsUseCase } from '../useCases/ListTransactionsUseCase';

export function makeListTransactionsUseCase() {
  const transactionsRepository = new TransactionsRepository();

  return new ListTransactionsUseCase(
    transactionsRepository,
  );
}
