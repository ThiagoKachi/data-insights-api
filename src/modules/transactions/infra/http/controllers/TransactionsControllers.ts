import { CreateTransactionsUseCase } from '@modules/transactions/useCases/CreateTransactionsUseCase';
import { RemoveManyTransactionsUseCase } from '@modules/transactions/useCases/RemoveManyTransactionsUseCase';
import { RemoveTransactionsUseCase } from '@modules/transactions/useCases/RemoveTransactionsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TransactionsController {
  constructor(
    private createTransactionsUseCase: CreateTransactionsUseCase,
    private removeTransactionsUseCase: RemoveTransactionsUseCase,
    private removeManyTransactionsUseCase: RemoveManyTransactionsUseCase,
  ) {}

  public async create(request: FastifyRequest, reply: FastifyReply) {
    const transactionData = request.transactionData;
    const userId = request.userId!;

    await this.createTransactionsUseCase.execute({ transactionData, userId });

    return reply.status(201).send();
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
