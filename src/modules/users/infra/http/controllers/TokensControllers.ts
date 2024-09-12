import { IResetToken } from '@modules/users/domain/models/IResetToken';
import { ForgotPasswordUseCase } from '@modules/users/useCases/ForgotPasswordUseCase';
import { ResetPasswordUseCase } from '@modules/users/useCases/ResetPasswordUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TokensController {
  constructor(
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase
  ) {}

  public async generate(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.body as { email: string };

    const token = await this.forgotPasswordUseCase.execute(email);

    return reply.status(200).send(token);
  }

  public async reset(request: FastifyRequest, reply: FastifyReply) {
    const { password, token } = request.body as IResetToken;

    await this.resetPasswordUseCase.execute({ password, token });

    return reply.status(200).send(null);
  }
}
