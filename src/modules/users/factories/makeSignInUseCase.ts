import { UsersRepository } from '../infra/database/repositories/UsersRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import { TokenProvider } from '../providers/TokenProvider/implementations/TokenProvider';
import { SignInUseCase } from '../useCases/SignInUseCase';
import { SignInValidator } from '../validators/signInValidator';

export function makeSignInUseCase() {
  const usersRepository = new UsersRepository();
  const signInValidator = new SignInValidator();
  const hashProvider = new BcryptHashProvider();
  const tokenProvider = new TokenProvider();

  const signInUseCase = new SignInUseCase(
    usersRepository,
    signInValidator,
    hashProvider,
    tokenProvider
  );

  return signInUseCase;
}
