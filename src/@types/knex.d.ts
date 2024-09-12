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
    user_tokens: {
      id: string
      user_id: string
      token: string
      created_at: Date
      expires_at: Date
    }
  }
}

export default Knex;
