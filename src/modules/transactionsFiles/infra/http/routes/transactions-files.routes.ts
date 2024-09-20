
import { makeTransactionsFilesUseCase } from '@modules/transactionsFiles/factories/makeTransactionsFilesUseCase';
import { authMiddleware } from '@shared/infra/http/middlewares/isAuthenticated';
import { FastifyInstance } from 'fastify';

const transactionsFilesUseCases = makeTransactionsFilesUseCase();

export async function transactionsFilesRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    { onRequest: [authMiddleware] },
    async (req, res) => transactionsFilesUseCases.listAllFiles(req, res)
  );
  fastify.get(
    '/:id',
    { onRequest: [authMiddleware] },
    async (req, res) => transactionsFilesUseCases.listTransactionsByFile(req, res)
  );
}
