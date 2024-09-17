import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { CreateTransactionsUseCase } from '../useCases/CreateTransactionsUseCase';
import { CreateTransactionValidator } from '../validators/createTransactionValidator';
import { DateValidator } from '../validators/dateValidator';

export function makeCreateTransactionsUseCase() {
  const transactionsRepository = new TransactionsRepository();
  const createTransactionvalidator = new CreateTransactionValidator();
  const dateValidator = new DateValidator();

  return new CreateTransactionsUseCase(
    transactionsRepository,
    createTransactionvalidator,
    dateValidator
  );
}
