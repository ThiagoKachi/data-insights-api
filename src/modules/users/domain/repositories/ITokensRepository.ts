import { ICreateToken } from '../models/ICreateToken';
import { IUserToken } from '../models/IUserToken';

export interface ITokensRepository {
  generate(token: ICreateToken): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
  removeByToken(token: string): Promise<void>;
  expireOldTokens(userId: string): Promise<void>;
  countActiveTokens(userId: string): Promise<number>;
}
