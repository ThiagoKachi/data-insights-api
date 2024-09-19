import { TransactionsController } from '../infra/http/controllers/TransactionsControllers';
import { makeCreateTransactionsUseCase } from './makeCreateTransactionsUseCase';
import { makeListFilesTransactionsUseCase } from './makeListFilesTransactionsByFileUseCase';
import { makeListTransactionsByFileUseCase } from './makeListTransactionsByFileUseCase';
import { makeListTransactionsUseCase } from './makeListTransactionsUseCase';
import { makeRemoveManyTransactionUseCase } from './makeRemoveManyTransactionUseCase';
import { makeRemoveTransactionUseCase } from './makeRemoveTransactionUseCase';
import { makeUpdateTransactionsUseCase } from './makeUpdateTransactionsUseCase';

export function makeTransactionsUseCase() {
  const createTransactionsUseCase = makeCreateTransactionsUseCase();
  const removeTransactionUseCase = makeRemoveTransactionUseCase();
  const removeManyTransactionUseCase = makeRemoveManyTransactionUseCase();
  const updateTransactionsUseCase = makeUpdateTransactionsUseCase();
  const listTransactionsUseCase = makeListTransactionsUseCase();
  const listTransactionsByFileUseCase = makeListTransactionsByFileUseCase();
  const listFilesTransactionsUseCase = makeListFilesTransactionsUseCase();

  return new TransactionsController(
    createTransactionsUseCase,
    removeTransactionUseCase,
    removeManyTransactionUseCase,
    updateTransactionsUseCase,
    listTransactionsUseCase,
    listTransactionsByFileUseCase,
    listFilesTransactionsUseCase
  );
}
