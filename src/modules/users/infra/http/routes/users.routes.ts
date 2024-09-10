import { makeUserUseCase } from '@modules/users/factories/makeUserUseCase';
import { FastifyInstance } from 'fastify';

const usersUseCases = makeUserUseCase();

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.post('/', async (req, res) => usersUseCases.signIn(req, res));
}
