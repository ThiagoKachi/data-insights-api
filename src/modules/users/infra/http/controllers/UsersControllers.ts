import { ISignIn } from '@modules/users/domain/models/ISignIn';
import { SignInUseCase } from '@modules/users/useCases/SignInUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UsersController {
  constructor(private signInUseCase: SignInUseCase) {}

  public async signIn(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as ISignIn;

    const user = await this.signInUseCase.execute({
      email,
      password,
    });

    return reply.status(201).send(user);
  }
}
