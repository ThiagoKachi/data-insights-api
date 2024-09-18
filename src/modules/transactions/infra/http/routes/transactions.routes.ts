import { makeTransactionsUseCase } from '@modules/transactions/factories/makeTransactionsUseCase';
import { authMiddleware } from '@shared/infra/http/middlewares/isAuthenticated';
import { FastifyInstance } from 'fastify';
import { transactionFileMiddleware } from '../middlewares/transactionsFile';

const transactionsUseCases = makeTransactionsUseCase();

export async function transactionsRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/',
    { onRequest: [authMiddleware], preHandler: [transactionFileMiddleware] },
    async (req, res) => transactionsUseCases.create(req, res)
  );
  fastify.post(
    '/batch',
    { onRequest: [authMiddleware] },
    async (req, res) => transactionsUseCases.batchRemove(req, res)
  );
  fastify.delete(
    '/:id',
    { onRequest: [authMiddleware] },
    async (req, res) => transactionsUseCases.remove(req, res)
  );
}
