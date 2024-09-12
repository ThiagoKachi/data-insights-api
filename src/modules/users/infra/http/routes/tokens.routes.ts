import { makeTokenUseCase } from '@modules/users/factories/makeTokenUseCase';
import { FastifyInstance } from 'fastify';

const tokenUseCase = makeTokenUseCase();

export async function tokensRoutes(fastify: FastifyInstance) {
  fastify.post('/forgot', async (req, res) => tokenUseCase.generate(req, res));
  fastify.put('/reset', async (req, res) => tokenUseCase.reset(req, res));
}
