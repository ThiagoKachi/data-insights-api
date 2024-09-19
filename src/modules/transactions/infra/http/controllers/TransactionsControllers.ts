import { ITransactionRequest } from '@modules/transactions/domain/models/ITransactionRequest';
import { ITransactionsByFileRequest } from '@modules/transactions/domain/models/ITransactionsByFileRequest';
import { IUpdateTransaction } from '@modules/transactions/domain/models/IUpdateTransaction';
import { CreateTransactionsUseCase } from '@modules/transactions/useCases/CreateTransactionsUseCase';
import { ListFilesTransactionsUseCase } from '@modules/transactions/useCases/ListFilesTransactionsUseCase';
import { ListTransactionsByFileUseCase } from '@modules/transactions/useCases/ListTransactionsByFileUseCase';
import { ListTransactionsUseCase } from '@modules/transactions/useCases/ListTransactionsUseCase';
import { RemoveManyTransactionsUseCase } from '@modules/transactions/useCases/RemoveManyTransactionsUseCase';
import { RemoveTransactionsUseCase } from '@modules/transactions/useCases/RemoveTransactionsUseCase';
import { UpdateTransactionsUseCase } from '@modules/transactions/useCases/UpdateTransactionsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TransactionsController {
  constructor(
    private createTransactionsUseCase: CreateTransactionsUseCase,
    private removeTransactionsUseCase: RemoveTransactionsUseCase,
    private removeManyTransactionsUseCase: RemoveManyTransactionsUseCase,
    private updateTransactionsUseCase: UpdateTransactionsUseCase,
    private listTransactionsUseCase: ListTransactionsUseCase,
    private listTransactionsByFileUseCase: ListTransactionsByFileUseCase,
    private listFilesTransactionsUseCase: ListFilesTransactionsUseCase,
  ) {}

  public async listAll(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId!;
    const {
      pageIndex,
      pageSize,
      ...searchParams
    } = request.query as ITransactionRequest;

    const transactions = await this.listTransactionsUseCase.execute({
      userId,
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      searchParams: searchParams as ITransactionRequest['searchParams']
    });

    return reply.status(200).send(transactions);
  }

  public async listByFile(request: FastifyRequest, reply: FastifyReply) {
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

  public async create(request: FastifyRequest, reply: FastifyReply) {
    const transactionData = request.transactionData;
    const fileName = request.fileName;
    const userId = request.userId!;

    await this.createTransactionsUseCase.execute({ transactionData, userId, fileName });

    return reply.status(201).send();
  }

  public async update(request: FastifyRequest, reply: FastifyReply) {
    const transactionData = request.body as IUpdateTransaction;
    const userId = request.userId!;

    const { id } = request.params as { id: string };

    await this.updateTransactionsUseCase.execute({ id, transactionData, userId });

    return reply.status(200).send();
  }

  public async remove(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const userId = request.userId!;

    await this.removeTransactionsUseCase.execute(id, userId);

    return reply.status(204).send();
  }

  public async batchRemove(request: FastifyRequest, reply: FastifyReply) {
    const { ids } = request.body as { ids: string[] };
    const userId = request.userId!;

    await this.removeManyTransactionsUseCase.execute(ids, userId);

    return reply.status(204).send();
  }
}
