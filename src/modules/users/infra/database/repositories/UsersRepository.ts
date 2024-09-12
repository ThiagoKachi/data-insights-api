import { ISignUp, ISignUpResponse } from '@modules/users/domain/models/ISignUp';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { knex } from '@shared/infra/libs/knex';
import { Knex } from 'knex';

export class UsersRepository implements IUsersRepository {
  private knexClient: Knex;

  constructor() {
    this.knexClient = knex;
  }

  public async signUp(userData: ISignUp): Promise<ISignUpResponse> {
    const [user] = await this.knexClient('users').insert(userData).returning('*');

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const [user] = await this.knexClient('users').where('id', id).select('*');

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const [user] = await this.knexClient('users').where('email', email).select('*');

    return user;
  }

  public async updatePassword(id: string, password: string): Promise<void> {
    await this.knexClient('users').where('id', id).update({ password_hash: password });
  }
}
