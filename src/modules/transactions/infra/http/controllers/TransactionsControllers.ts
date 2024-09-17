import { CreateTransactionsUseCase } from '@modules/transactions/useCases/CreateTransactionsUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TransactionsController {
  constructor(private createTransactionsUseCase: CreateTransactionsUseCase) {}

  public async create(request: FastifyRequest, reply: FastifyReply) {
    const transactionData = request.transactionData;
    const userId = request.userId!;

    await this.createTransactionsUseCase.execute({ transactionData, userId });

    return reply.status(201).send();
  }
}
