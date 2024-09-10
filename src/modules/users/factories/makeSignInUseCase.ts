import { UsersRepository } from '../infra/supabase/repositories/UsersRepository';
import { SignInUseCase } from '../useCases/SignInUseCase';
import { SignInValidator } from '../validators/signInValidator';

export function makeSignInUseCase() {
  const usersRepository = new UsersRepository();
  const signInValidator = new SignInValidator();

  const signInUseCase = new SignInUseCase(usersRepository, signInValidator);

  return signInUseCase;
}
