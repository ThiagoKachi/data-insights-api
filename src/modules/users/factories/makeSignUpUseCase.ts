import { UsersRepository } from '../infra/supabase/repositories/UsersRepository';
import { SignUpUseCase } from '../useCases/SignUpUseCase';
import { SignUpValidator } from '../validators/signUpValidator';

export function makeSignUpUseCase() {
  const usersRepository = new UsersRepository();
  const signUpValidator = new SignUpValidator();

  const signUpUseCase = new SignUpUseCase(usersRepository, signUpValidator);

  return signUpUseCase;
}
