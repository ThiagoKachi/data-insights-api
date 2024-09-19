import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      name: string
      email: string
      password_hash: string
      created_at: Date
    },
    files: {
      id: string
      file_name: string
      created_at: Date;
      user_id: string
    },
    user_tokens: {
      id: string
      user_id: string
      token: string
      created_at: Date
      expires_at: Date
    },
    financial_transactions: {
      id: string
      user_id: string
      transaction_date: Date
      category: string
      description: string
      type: string
      value: number
      payment_method: string
      status: string
      entity: string
      invoice_number: string | null
      responsible: string
      cost_center: string
      due_date: Date | null
      taxes: number | null
      created_at: Date
      updated_at: Date
      file_id: string;
    }
  }
}

export default Knex;
