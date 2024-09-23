import { ITransactionReportRequest } from '../domain/models/ITransactionReportRequest';
import { ITransactionReportResponse } from '../domain/models/ITransactionReportResponse';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';

export class TransactionsReportUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  public async execute({
    userId,
    initialPeriod,
    finalPeriod
  }: ITransactionReportRequest): Promise<ITransactionReportResponse | undefined> {
    const transactions = await this.transactionsRepository.getReport({
      userId,
      initialPeriod,
      finalPeriod
    });

    return transactions;
  }
}
