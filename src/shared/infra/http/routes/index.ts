import { transactionsRoutes } from '@modules/transactions/infra/http/routes/transactions.routes';
import { transactionsFilesRoutes } from '@modules/transactionsFiles/infra/http/routes/transactions-files.routes';
import { tokensRoutes } from '@modules/users/infra/http/routes/tokens.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { fastify } from '../index';

export async function appRoutes() {
  fastify.register(usersRoutes, { prefix: '/users' });
  fastify.register(tokensRoutes, { prefix: '/sessions' });
  fastify.register(transactionsRoutes, { prefix: '/transactions' });
  fastify.register(transactionsFilesRoutes, { prefix: '/transactions/files' });
}
