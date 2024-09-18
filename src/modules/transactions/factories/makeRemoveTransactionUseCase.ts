import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { RemoveTransactionsUseCase } from '../useCases/RemoveTransactionsUseCase';

export function makeRemoveTransactionUseCase() {
  const transactionsRepository = new TransactionsRepository();

  return new RemoveTransactionsUseCase(
    transactionsRepository,
  );
}
