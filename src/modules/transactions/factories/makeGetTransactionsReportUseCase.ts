import { TransactionsRepository } from '../infra/database/repositories/TransactionsRepository';
import { TransactionsReportUseCase } from '../useCases/TransactionsReportUseCase';
import { makeReportTemplateUseCase } from './makeReportTemplateUseCase';

export function makeGetTransactionsReportUseCase() {
  const transactionsRepository = new TransactionsRepository();
  const reportTemplateUseCase = makeReportTemplateUseCase();

  return new TransactionsReportUseCase(
    transactionsRepository,
    reportTemplateUseCase
  );
}
