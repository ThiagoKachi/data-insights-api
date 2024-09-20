import { AppError } from '@shared/errors/AppError';
import { IUpdateTransactionRequest } from '../domain/models/IUpdateTransactionRequest';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';
import { DateValidator } from '../validators/dateValidator';
import { UpdateTransactionValidator } from '../validators/updateTransactionValidator';

export class UpdateTransactionsUseCase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private updateTransactionValidator: UpdateTransactionValidator,
    private dateValidator: DateValidator,
  ) {}

  public async execute({
    id,
    transactionData,
    userId
  }: IUpdateTransactionRequest): Promise<void> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    if (transaction.user_id !== userId) {
      throw new AppError('Unauthorized', 401);
    }

    const validatedData = await this.updateTransactionValidator.validate(transactionData);

    const dueDateToUpdate = validatedData.due_date ? this.dateValidator
      .validate(validatedData.due_date) : null;

    await this.transactionsRepository.update({
      id,
      transactionData: { ...validatedData, due_date: dueDateToUpdate },
      userId
    });
  }
}
