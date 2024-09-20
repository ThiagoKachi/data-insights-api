import { ITransactionsFilesRepository } from '@modules/transactionsFiles/domain/repositories/ITransactionsFilesRepository';
import { AppError } from '@shared/errors/AppError';
import { ICreateTransactionRequest } from '../domain/models/ICreateTransactionRequest';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';
import { CreateTransactionValidator } from '../validators/createTransactionValidator';
import { DateValidator } from '../validators/dateValidator';

export class CreateTransactionsUseCase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private transactionsFilesRepository: ITransactionsFilesRepository,
    private createTransactionvalidator: CreateTransactionValidator,
    private dateValidator: DateValidator,
  ) {}

  public async execute({
    transactionData,
    userId,
    fileName
  }: ICreateTransactionRequest): Promise<void> {
    for (const data of transactionData) {
      try {
        await this.createTransactionvalidator.validate(data);
      } catch (error) {
        throw new AppError(`Invalid data ${error}`, 400);
      }
    }

    const file = await this.transactionsFilesRepository.createFile({
      fileName: fileName!,
      userId,
      quantity: transactionData.length
    });

    const dataWithValidDate = transactionData.map((data) => {
      const transaction_date = this.dateValidator.validate(data.transaction_date.toString());
      const due_date = data.due_date
        ? this.dateValidator.validate(data.due_date.toString())
        : null;

      return { ...data, transaction_date, due_date, file_id: file!.id };
    });

    await this.transactionsRepository.create({
      transactionData: dataWithValidDate,
      userId
    });
  }
}
