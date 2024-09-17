import { AppError } from '@shared/errors/AppError';
import { ICreateTransactionRequest, ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';
import { CreateTransactionValidator } from '../validators/createTransactionValidator';
import { DateValidator } from '../validators/dateValidator';

export class CreateTransactionsUseCase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private createTransactionvalidator: CreateTransactionValidator,
    private dateValidator: DateValidator,
  ) {}

  public async execute({
    transactionData,
    userId
  }: ICreateTransactionRequest): Promise<void> {
    for (const data of transactionData) {
      try {
        await this.createTransactionvalidator.validate(data);
      } catch (error) {
        throw new AppError(`Invalid data ${error}`, 400);
      }
    }

    const dataWithValidDate = transactionData.map((data) => {
      const transaction_date = this.dateValidator.validate(data.transaction_date);
      const due_date = data.due_date ? this.dateValidator.validate(data.due_date) : null;

      return { ...data, transaction_date, due_date };
    });

    await this.transactionsRepository.create({
      transactionData: dataWithValidDate,
      userId
    });
  }
}
