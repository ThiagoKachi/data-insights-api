import { AppError } from '@shared/errors/AppError';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';

export class RemoveManyTransactionsUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  public async execute(transactionIds: string[], userId: string): Promise<void> {
    const transactions = await this.transactionsRepository.findManyById(transactionIds);

    const transactionsIds = transactions?.map((transaction) => transaction.id);

    const missingTransactionsIds = transactionIds
      .filter((id) => !transactionsIds?.includes(id));

    if (missingTransactionsIds.length > 0) {
      throw new AppError(
        `Transaction(s) ${missingTransactionsIds.join(', ')} not found`, 404
      );
    }

    const transactionsSameUser = transactions
      ?.every((transaction) => transaction.user_id === userId);

    if (!transactionsSameUser) {
      throw new AppError('Unauthorized', 401);
    }

    await this.transactionsRepository.removeMany(transactionIds, userId);
  }
}
