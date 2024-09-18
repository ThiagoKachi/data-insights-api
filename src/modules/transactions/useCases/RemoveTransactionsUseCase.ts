import { AppError } from '@shared/errors/AppError';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';

export class RemoveTransactionsUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  public async execute(transactionId: string, userId: string): Promise<void> {
    const transaction = await this.transactionsRepository.findById(transactionId);

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    if (transaction.user_id !== userId) {
      throw new AppError('Unauthorized', 401);
    }

    await this.transactionsRepository.remove(transactionId, userId);
  }
}
