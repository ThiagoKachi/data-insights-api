import { AppError } from '@shared/errors/AppError';
import { ISignIn, ISignInResponse } from '../domain/models/ISignIn';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../providers/TokenProvider/models/ITokenProvider';
import { SignInValidator } from '../validators/signInValidator';

export class SignInUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private signInValidator: SignInValidator,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider,
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
