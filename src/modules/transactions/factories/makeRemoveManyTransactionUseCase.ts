import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { RemoveManyTransactionsUseCase } from '../useCases/RemoveManyTransactionsUseCase';

export function makeRemoveManyTransactionUseCase() {
  const transactionsRepository = new TransactionsRepository();

  return new RemoveManyTransactionsUseCase(
    transactionsRepository,
  );
}
