import { TransactionsController } from '../infra/http/controllers/TransactionsControllers';
import { makeCreateTransactionsUseCase } from './makeCreateTransactionsUseCase';
import { makeGetTransactionsReportUseCase } from './makeGetTransactionsReportUseCase';
import { makeGetTransactionsResumeUseCase } from './makeGetTransactionsResumeUseCase';
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
  const getTransactionsReportUseCase = makeGetTransactionsReportUseCase();
  const getTransactionsResumeUseCase = makeGetTransactionsResumeUseCase();

  return new TransactionsController(
    createTransactionsUseCase,
    removeTransactionUseCase,
    removeManyTransactionUseCase,
    updateTransactionsUseCase,
    listTransactionsUseCase,
    getTransactionsReportUseCase,
    getTransactionsResumeUseCase
  );
}
