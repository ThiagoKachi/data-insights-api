import { AppError } from '@shared/errors/AppError';
import { ISignUp, ISignUpResponse } from '../domain/models/ISignUp';
import { UsersRepository } from '../infra/supabase/repositories/UsersRepository';
import { SignUpValidator } from '../validators/signUpValidator';

export class SignUpUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signUpValidator: SignUpValidator,
  ) {}

  public async execute(signUpData: ISignUp): Promise<ISignUpResponse> {
    const validatedData = this.signUpValidator.validate(signUpData);

    const user = await this.usersRepository.findByEmail(validatedData.email);

    if (user && user.data.user) {
      throw new AppError('User already exists', 401);
    }

    const { data, error } = await this.usersRepository.signUp(validatedData);

    console.log({ data, error }, 'aqui');

    if (error) {
      throw new AppError(error.message, 401);
    }

    if (data.user) {
      await this.usersRepository.insertUserData({
        id: data.user.id!,
        email: data.user.email!,
      });
    }

    return { data };
  }
}
