import { ITransactionReportRequest } from '@modules/transactions/domain/models/ITransactionReportRequest';
import { ITransactionRequest } from '@modules/transactions/domain/models/ITransactionRequest';
import { IUpdateTransaction } from '@modules/transactions/domain/models/IUpdateTransaction';
import { CreateTransactionsUseCase } from '@modules/transactions/useCases/CreateTransactionsUseCase';
import { ListTransactionsUseCase } from '@modules/transactions/useCases/ListTransactionsUseCase';
import { RemoveManyTransactionsUseCase } from '@modules/transactions/useCases/RemoveManyTransactionsUseCase';
import { RemoveTransactionsUseCase } from '@modules/transactions/useCases/RemoveTransactionsUseCase';
import { TransactionsReportUseCase } from '@modules/transactions/useCases/TransactionsReportUseCase';
import { TransactionsResumeUseCase } from '@modules/transactions/useCases/TransactionsResumeUseCase';
import { UpdateTransactionsUseCase } from '@modules/transactions/useCases/UpdateTransactionsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TransactionsController {
  constructor(
    private createTransactionsUseCase: CreateTransactionsUseCase,
    private removeTransactionsUseCase: RemoveTransactionsUseCase,
    private removeManyTransactionsUseCase: RemoveManyTransactionsUseCase,
    private updateTransactionsUseCase: UpdateTransactionsUseCase,
    private listTransactionsUseCase: ListTransactionsUseCase,
    private transactionsReportUseCase: TransactionsReportUseCase,
    private transactionsResumeUseCase: TransactionsResumeUseCase,
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

  public async getReport(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId!;
    const {
      initialPeriod,
      finalPeriod
    } = request.query as ITransactionReportRequest;

    const pdfBuffer = await this.transactionsReportUseCase.execute({
      userId,
      initialPeriod,
      finalPeriod
    });

    return reply
      .type('application/pdf')
      .header('Content-Disposition', 'attachment; filename="transactions.pdf"')
      .status(200)
      .send(pdfBuffer);
  }

  public async getResume(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId!;

    const transactionsResume = await this.transactionsResumeUseCase.execute({
      userId
    });

    return reply.status(200).send(transactionsResume);
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
