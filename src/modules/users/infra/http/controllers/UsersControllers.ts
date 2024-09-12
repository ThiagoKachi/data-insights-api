import { ISignIn } from '@modules/users/domain/models/ISignIn';
import { ISignUp } from '@modules/users/domain/models/ISignUp';
import { SignInUseCase } from '@modules/users/useCases/SignInUseCase';
import { SignUpUseCase } from '@modules/users/useCases/SignUpUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export class UsersController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase
  ) {}

  public async signIn(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as ISignIn;

    const user = await this.signInUseCase.execute({
      email,
      password,
    });

    return reply.status(200).send(user);
  }

  public async signUp(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as ISignUp;

    const user = await this.signUpUseCase.execute(data);

    return reply.status(201).send(user);
  }
}
