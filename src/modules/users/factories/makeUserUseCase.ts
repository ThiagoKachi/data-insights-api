import { UsersController } from '../infra/http/controllers/UsersControllers';
import { makeSignInUseCase } from './makeSignInUseCase';
import { makeSignUpUseCase } from './makeSignUpUseCase';

export function makeUserUseCase() {
  const signInUseCase = makeSignInUseCase();
  const signUpUseCase = makeSignUpUseCase();

  return new UsersController(signInUseCase, signUpUseCase);
}
