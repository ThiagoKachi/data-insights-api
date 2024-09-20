import { TransactionsFilesController } from '../infra/http/controllers/TransactionsFilesControllers';
import { makeListFilesTransactionsUseCase } from './makeListFilesTransactionsByFileUseCase';
import { makeListTransactionsByFileUseCase } from './makeListTransactionsByFileUseCase';

export function makeTransactionsFilesUseCase() {
  const listTransactionsByFileUseCase = makeListTransactionsByFileUseCase();
  const listFilesTransactionsUseCase = makeListFilesTransactionsUseCase();

  return new TransactionsFilesController(
    listTransactionsByFileUseCase,
    listFilesTransactionsUseCase
  );
}
