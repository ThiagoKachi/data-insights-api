import { env } from '@config/env';
import { Knex, knex as setupKnex } from 'knex';

export const config: Knex.Config = {
  client: 'pg',
  connection: {
    connectionString: env.DATABASE_URL,
    host: env.DATABASE_HOST,
    port: 5432,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

export const knex = setupKnex(config);
