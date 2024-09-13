import { AppError } from '@shared/errors/AppError';
import { IResetToken } from '../domain/models/IResetToken';
import { ITokensRepository } from '../domain/repositories/ITokensRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IResetToken): Promise<void> {
    const token = await this.tokensRepository.findByToken(data.token);

    if (!token) {
      throw new AppError('Token not found', 404);
    }

    const user = await this.usersRepository.findById(token.user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (Date.now() > token.expires_at.getTime()) {
      await this.tokensRepository.removeByToken(data.token);

      throw new AppError('Token expired', 401);
    }

    const newPassword = await this.hashProvider.generateHash(data.password);

    await this.usersRepository.updatePassword(user.id, newPassword);
    await this.tokensRepository.removeByToken(data.token);
  }
}
