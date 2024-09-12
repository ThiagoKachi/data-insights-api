import { AppError } from '@shared/errors/AppError';
import { ISignUp, ISignUpResponse } from '../domain/models/ISignUp';
import { UsersRepository } from '../infra/database/repositories/UsersRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import { SignUpValidator } from '../validators/signUpValidator';

export class SignUpUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signUpValidator: SignUpValidator,
    private hashProvider: BcryptHashProvider,
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
