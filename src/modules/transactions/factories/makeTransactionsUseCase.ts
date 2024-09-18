import { TransactionsController } from '../infra/http/controllers/TransactionsControllers';
import { makeCreateTransactionsUseCase } from './makeCreateTransactionsUseCase';
import { makeRemoveManyTransactionUseCase } from './makeRemoveManyTransactionUseCase';
import { makeRemoveTransactionUseCase } from './makeRemoveTransactionUseCase';

export function makeTransactionsUseCase() {
  const createTransactionsUseCase = makeCreateTransactionsUseCase();
  const removeTransactionUseCase = makeRemoveTransactionUseCase();
  const removeManyTransactionUseCase = makeRemoveManyTransactionUseCase();

  return new TransactionsController(
    createTransactionsUseCase,
    removeTransactionUseCase,
    removeManyTransactionUseCase
  );
}
