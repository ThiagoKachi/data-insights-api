import { UsersRepository } from '../infra/database/repositories/UsersRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import { SignUpUseCase } from '../useCases/SignUpUseCase';
import { SignUpValidator } from '../validators/signUpValidator';

export function makeSignUpUseCase() {
  const usersRepository = new UsersRepository();
  const signUpValidator = new SignUpValidator();
  const hashProvider = new BcryptHashProvider();

  const signUpUseCase = new SignUpUseCase(
    usersRepository,
    signUpValidator,
    hashProvider
  );

  return signUpUseCase;
}
