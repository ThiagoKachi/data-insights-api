import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { TransactionsReportUseCase } from '../useCases/TransactionsReportUseCase';

export function makeGetTransactionsReportUseCase() {
  const transactionsRepository = new TransactionsRepository();

  return new TransactionsReportUseCase(
    transactionsRepository,
  );
}
