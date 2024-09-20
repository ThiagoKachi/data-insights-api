import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('files', (table) => {
    table.integer('transactions_quantity').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('files', (table) => {
    table.dropColumn('transactions_quantity');
  });
}

