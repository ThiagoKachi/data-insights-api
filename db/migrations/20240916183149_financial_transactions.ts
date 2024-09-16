import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('financial_transactions', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.timestamp('transaction_date').notNullable();
    table.string('category').notNullable();
    table.string('description').notNullable();
    table.string('type').notNullable();
    table.decimal('value', 15, 2).notNullable();
    table.string('payment_method').notNullable();
    table.string('status').notNullable();
    table.string('entity').notNullable();
    table.string('invoice_number').nullable();
    table.string('responsible').notNullable();
    table.string('cost_center').notNullable();
    table.timestamp('due_date').nullable();
    table.decimal('taxes', 10, 2).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('financial_transactions');
}
