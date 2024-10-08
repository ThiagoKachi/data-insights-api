import { env } from '@config/env';
import { AppError } from '@shared/errors/AppError';
import { ITokensRepository } from '../domain/repositories/ITokensRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IMailProvider } from '../providers/MailProvider/models/IMailProvider';
import { ITokenProvider } from '../providers/TokenProvider/models/ITokenProvider';

export class ForgotPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenProvider: ITokenProvider,
    private resendMail: IMailProvider,
    private tokensRepository: ITokensRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.tokensRepository.expireOldTokens(user.id);

    const tokenCount = await this.tokensRepository.countActiveTokens(user.id);

    if (tokenCount >= 3) {
      throw new AppError(
        'You have reached the maximum number of attempts, try again later.',
        429
      );
    }

    const token = await this.tokenProvider.generateToken({ userId: user.id });

    await this.tokensRepository.generate({
      user_id: user.id,
      token,
      expires_at: new Date(Date.now() + 30 * 60 * 1000),
    });

    await this.resendMail.sendMail({
      to: user.email,
      subject: 'Redefinir minha senha - Data Insights TJK',
      templateData: {
        variables: {
          name: user.name,
          link: `${env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      }
    });
  }
}
