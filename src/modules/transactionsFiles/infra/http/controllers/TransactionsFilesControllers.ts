import { ITransactionsByFileRequest } from '@modules/transactionsFiles/domain/models/ITransactionsByFileRequest';
import { ListFilesTransactionsUseCase } from '@modules/transactionsFiles/useCases/ListFilesTransactionsUseCase';
import { ListTransactionsByFileUseCase } from '@modules/transactionsFiles/useCases/ListTransactionsByFileUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TransactionsFilesController {
  constructor(
    private listTransactionsByFileUseCase: ListTransactionsByFileUseCase,
    private listFilesTransactionsUseCase: ListFilesTransactionsUseCase,
  ) {}

  public async listTransactionsByFile(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId!;
    const { id } = request.params as { id: string };
    const {
      pageIndex,
      pageSize,
    } = request.query as ITransactionsByFileRequest;

    const transactions = await this.listTransactionsByFileUseCase.execute({
      id,
      userId,
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
    });

    return reply.status(200).send(transactions);
  }

  public async listAllFiles(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId!;
    const {
      pageIndex,
      pageSize,
    } = request.query as ITransactionsByFileRequest;

    const transactions = await this.listFilesTransactionsUseCase.execute({
      userId,
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
    });

    return reply.status(200).send(transactions);
  }
}
