import { ICreateToken } from '@modules/users/domain/models/ICreateToken';
import { IUserToken } from '@modules/users/domain/models/IUserToken';
import { ITokensRepository } from '@modules/users/domain/repositories/ITokensRepository';
import { knex } from '@shared/infra/libs/knex';
import { Knex } from 'knex';

export class TokensRepository implements ITokensRepository {
  private knexClient: Knex;

  constructor() {
    this.knexClient = knex;
  }

  public async expireOldTokens(userId: string): Promise<void> {
    await this.knexClient('user_tokens')
      .where('user_id', userId).andWhere('expires_at', '<', new Date()).del();
  }

  public async countActiveTokens(userId: string): Promise<number> {
    const tokens = await this.knexClient('user_tokens')
      .where('user_id', userId).andWhere('expires_at', '>', new Date()).count();

    return Number(tokens[0].count);
  }

  public async generate(data: ICreateToken): Promise<IUserToken> {
    const [userToken] = await this
      .knexClient('user_tokens')
      .insert(data)
      .returning('*');

    return userToken;
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = await this.knexClient('user_tokens').where('token', token).first();

    return userToken;
  }

  public async removeByToken(token: string): Promise<void> {
    await this.knexClient('user_tokens').delete().where('token', token);
  }
}
