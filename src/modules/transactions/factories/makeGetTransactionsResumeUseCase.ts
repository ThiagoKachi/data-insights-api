import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { TransactionsResumeUseCase } from '../useCases/TransactionsResumeUseCase';

export function makeGetTransactionsResumeUseCase() {
  const transactionsRepository = new TransactionsRepository();

  return new TransactionsResumeUseCase(
    transactionsRepository,
  );
}
