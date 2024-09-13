import { AppError } from '@shared/errors/AppError';
import { ISignUp, ISignUpResponse } from '../domain/models/ISignUp';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { SignUpValidator } from '../validators/signUpValidator';

export class SignUpUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private signUpValidator: SignUpValidator,
    private hashProvider: IHashProvider,
  ) {}

  public async execute(signUpData: ISignUp): Promise<ISignUpResponse> {
    const validatedData = this.signUpValidator.validate(signUpData);

    const user = await this.usersRepository.findByEmail(validatedData.email);

    if (user) {
      throw new AppError('User already exists', 401);
    }

    const password_hash = await this.hashProvider
      .generateHash(validatedData.password_hash);

    const data = await this.usersRepository.signUp({
      ...validatedData,
      password_hash,
    });

    return { ...data, password_hash: undefined };
  }
}
