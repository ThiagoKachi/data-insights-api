import { TransactionsController } from '../infra/http/controllers/TransactionsControllers';
import { makeCreateTransactionsUseCase } from './makeCreateTransactionsUseCase';
import { makeRemoveTransactionUseCase } from './makeRemoveTransactionUseCase';

export function makeTransactionsUseCase() {
  const createTransactionsUseCase = makeCreateTransactionsUseCase();
  const removeTransactionUseCase = makeRemoveTransactionUseCase();

  return new TransactionsController(
    createTransactionsUseCase,
    removeTransactionUseCase
  );
}
