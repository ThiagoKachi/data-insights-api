import { ITransactionResponse } from '@modules/transactions/domain/models/ITransactionResponse';
import { ICreateFileRequest } from '@modules/transactionsFiles/domain/models/ICreateFileRequest';
import { ICreateFileResponse } from '@modules/transactionsFiles/domain/models/ICreateFileResponse';
import { IFiles } from '@modules/transactionsFiles/domain/models/IFiles';
import { IFilesTransactionRequest } from '@modules/transactionsFiles/domain/models/IFilesTransactionRequest';
import { IFilesTransactionResponse } from '@modules/transactionsFiles/domain/models/IFilesTransactionResponse';
import { ITransactionsByFileRequest } from '@modules/transactionsFiles/domain/models/ITransactionsByFileRequest';
import { ITransactionsFilesRepository } from '@modules/transactionsFiles/domain/repositories/ITransactionsFilesRepository';
import { knex } from '@shared/infra/libs/knex';
import { Knex } from 'knex';

export class TransactionsFilesRepository implements ITransactionsFilesRepository {
  private knexClient: Knex;

  constructor() {
    this.knexClient = knex;
  }

  public async findFileById(fileId: string): Promise<IFiles | undefined> {
    const file = await this.knexClient('files')
      .where('id', fileId)
      .first();

    return file;
  }

  public async listTransactionsByFile({
    id,
    userId,
    pageIndex,
    pageSize
  }: IFilesTransactionRequest): Promise<ITransactionResponse | undefined> {
    const transactions = await this
      .knexClient('financial_transactions')
      .where('user_id', userId)
      .andWhere('file_id', id)
      .paginate({ perPage: pageSize, currentPage: pageIndex });

    return transactions;
  }

  public async listAllFiles({
    userId,
    pageIndex,
    pageSize
  }: ITransactionsByFileRequest): Promise<IFilesTransactionResponse | undefined> {
    const filesTransactions = await this
      .knexClient('files')
      .where('user_id', userId)
      .paginate({ perPage: pageSize, currentPage: pageIndex });

    return filesTransactions;
  }

  public async createFile({
    userId,
    fileName,
    quantity
  }: ICreateFileRequest): Promise<ICreateFileResponse | undefined> {
    const [data] = await this
      .knexClient('files')
      .insert({ file_name: fileName, user_id: userId, transactions_quantity: quantity })
      .returning('*');

    return data;
  }
}
