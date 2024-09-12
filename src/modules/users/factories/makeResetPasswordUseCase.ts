import { TokensRepository } from '../infra/database/repositories/TokensRepository';
import { UsersRepository } from '../infra/database/repositories/UsersRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import { ResetPasswordUseCase } from '../useCases/ResetPasswordUseCase';

export function makeResetPasswordUseCase() {
  const usersRepository = new UsersRepository();
  const tokensRepository = new TokensRepository();
  const hashProvider = new BcryptHashProvider();

  const resetPasswordUseCase = new ResetPasswordUseCase(
    usersRepository,
    tokensRepository,
    hashProvider
  );

  return resetPasswordUseCase;
}
