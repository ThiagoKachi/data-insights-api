import { AppError } from '@shared/errors/AppError';
import { ISignIn, ISignInResponse } from '../domain/models/ISignIn';
import { UsersRepository } from '../infra/database/repositories/UsersRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import TokenProvider from '../providers/TokenProvider/implementations/TokenProvider';
import { SignInValidator } from '../validators/signInValidator';

export class SignInUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signInValidator: SignInValidator,
    private hashProvider: BcryptHashProvider,
    private tokenProvider: TokenProvider,
  ) {}

  public async execute(signInData: ISignIn): Promise<ISignInResponse> {
    const validatedData = this.signInValidator.validate(signInData);

    const user = await this.usersRepository.findByEmail(validatedData.email);

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const passwordConfirmed = await this.hashProvider
      .compareHash(validatedData.password, user.password_hash);

    if (!passwordConfirmed) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = await this.tokenProvider.generateToken({ userId: user.id });

    return { token };
  }
}
