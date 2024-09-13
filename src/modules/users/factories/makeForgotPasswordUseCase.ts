import { TokensRepository } from '../infra/database/repositories/TokensRepository';
import { UsersRepository } from '../infra/database/repositories/UsersRepository';
import { ResendMail } from '../providers/MailProvider/implementations/MailProvider';
import { TokenProvider } from '../providers/TokenProvider/implementations/TokenProvider';
import { ForgotPasswordUseCase } from '../useCases/ForgotPasswordUseCase';

export function makeForgotPasswordUseCase() {
  const usersRepository = new UsersRepository();
  const tokenProvider = new TokenProvider();
  const resendMail = new ResendMail();
  const tokensRepository = new TokensRepository();

  const forgotPasswordUseCase = new ForgotPasswordUseCase(
    usersRepository,
    tokenProvider,
    resendMail,
    tokensRepository,
  );

  return forgotPasswordUseCase;
}
