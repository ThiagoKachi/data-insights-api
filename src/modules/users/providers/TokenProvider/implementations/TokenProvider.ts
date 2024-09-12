import { env } from '@config/env';
import { sign } from 'jsonwebtoken';
import { ITokenProvider } from '../models/ITokenProvider';

export class TokenProvider implements ITokenProvider {
  public async generateToken(payload: string | object | Buffer): Promise<string> {
    return sign(payload, env.JWT_SECRET, { expiresIn: '1d' });
  }
}
