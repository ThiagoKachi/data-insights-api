import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('files', (table) => {
    table.uuid('user_id').notNullable();

    table
      .foreign('user_id', 'files_user_id_fkey')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('files', (table) => {
    table.dropForeign('user_id', 'files_user_id_fkey');
    table.dropColumn('user_id');
  });
}

