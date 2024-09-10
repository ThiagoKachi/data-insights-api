import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { fastify } from '../index';

export async function appRoutes() {
  fastify.register(usersRoutes, { prefix: '/users' });
}
