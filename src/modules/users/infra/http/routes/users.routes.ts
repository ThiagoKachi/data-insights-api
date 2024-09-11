import { makeUserUseCase } from '@modules/users/factories/makeUserUseCase';
import { FastifyInstance } from 'fastify';

const usersUseCases = makeUserUseCase();

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.post('/signin', async (req, res) => usersUseCases.signIn(req, res));
  fastify.post('/signup', async (req, res) => usersUseCases.signUp(req, res));
}
