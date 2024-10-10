import { ITransactionResumeRequest } from '../domain/models/ITransactionResumeRequest';
import { ITransactionResumeResponse } from '../domain/models/ITransactionResumeResponse';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';

export class TransactionsResumeUseCase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    userId,
  }: ITransactionResumeRequest): Promise<ITransactionResumeResponse | undefined> {
    const transactions = await this.transactionsRepository.getResume({ userId });

    return transactions;
  }
}
