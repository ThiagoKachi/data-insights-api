import { UsersController } from '../infra/http/controllers/UsersControllers';
import { makeSignInUseCase } from './makeSignInUseCase';

export function makeUserUseCase() {
  const signInUseCase = makeSignInUseCase();

  return new UsersController(signInUseCase);
}
