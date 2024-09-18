import { CreateTransactionsUseCase } from '@modules/transactions/useCases/CreateTransactionsUseCase';
import { RemoveTransactionsUseCase } from '@modules/transactions/useCases/RemoveTransactionsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TransactionsController {
  constructor(
    private createTransactionsUseCase: CreateTransactionsUseCase,
    private removeTransactionsUseCase: RemoveTransactionsUseCase,
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
}
