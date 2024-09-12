import { TokensController } from '../infra/http/controllers/TokensControllers';
import { makeForgotPasswordUseCase } from './makeForgotPasswordUseCase';
import { makeResetPasswordUseCase } from './makeResetPasswordUseCase';

export function makeTokenUseCase() {
  const forgotPasswordUseCase = makeForgotPasswordUseCase();
  const resetPasswordUseCase = makeResetPasswordUseCase();

  return new TokensController(forgotPasswordUseCase, resetPasswordUseCase);
}
