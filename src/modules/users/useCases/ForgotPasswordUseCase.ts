import { EXP_TIME_IN_DAYS } from '@config/constants';
import { env } from '@config/env';
import { AppError } from '@shared/errors/AppError';
import { TokensRepository } from '../infra/database/repositories/TokensRepository';
import { UsersRepository } from '../infra/database/repositories/UsersRepository';
import { ResendMail } from '../providers/MailProvider';
import { TokenProvider } from '../providers/TokenProvider/implementations/TokenProvider';

export class ForgotPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokenProvider: TokenProvider,
    private resendMail: ResendMail,
    private tokensRepository: TokensRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const token = await this.tokenProvider.generateToken({ userId: user.id });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

    await this.tokensRepository.generate({
      user_id: user.id,
      token,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
