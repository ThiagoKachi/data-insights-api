import { AppError } from '@shared/errors/AppError';
import { ISignIn, ISignInResponse } from '../domain/models/ISignIn';
import { UsersRepository } from '../infra/supabase/repositories/UsersRepository';
import { SignInValidator } from '../validators/signInValidator';

export class SignInUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signInValidator: SignInValidator,
  ) {}

  public async execute(signInData: ISignIn): Promise<ISignInResponse> {
    const validatedData = this.signInValidator.validate(signInData);

    const { data, error } = await this.usersRepository.signIn(validatedData);

    // const user = await this.usersRepository.findByEmail(validatedData.email);

    // if (!user) {
    //   throw new AppError('Invalid credentials', 401);
    // }

    if (error) {
      throw new AppError('Invalid credentials', 401);
    }

    return { data };
  }
}
