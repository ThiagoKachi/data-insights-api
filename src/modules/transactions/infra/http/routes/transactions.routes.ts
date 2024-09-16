import { FastifyInstance } from 'fastify';
import { TransactionsController } from '../controllers/UsersControllers';

// const transactionsUseCases = makeUserUseCase();
const transactionsUseCases = new TransactionsController();

export async function transactionsRoutes(fastify: FastifyInstance) {
  fastify.post('/',async (req, res) => transactionsUseCases.create(req, res));
}
