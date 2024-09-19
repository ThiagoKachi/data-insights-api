import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('financial_transactions', (table) => {
    table.uuid('file_id').notNullable();

    table
      .foreign('file_id', 'financial_transactions_file_id_fkey')
      .references('id')
      .inTable('files')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('financial_transactions', (table) => {
    table.dropForeign('user_id', 'financial_transactions_user_id_fkey');
    table.dropColumn('user_id');
  });
}

