import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { UpdateTransactionsUseCase } from '../useCases/UpdateTransactionsUseCase';
import { DateValidator } from '../validators/dateValidator';
import { UpdateTransactionValidator } from '../validators/updateTransactionValidator';

export function makeUpdateTransactionsUseCase() {
  const transactionsRepository = new TransactionsRepository();
  const updateTransactionValidator = new UpdateTransactionValidator();
  const dateValidator = new DateValidator();

  return new UpdateTransactionsUseCase(
    transactionsRepository,
    updateTransactionValidator,
    dateValidator
  );
}
