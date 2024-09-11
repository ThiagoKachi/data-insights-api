import { ICreateUser } from '../models/ICreateUser';
import { ISignIn, ISignInResponse } from '../models/ISignIn';
import { ISignUp, ISignUpResponse } from '../models/ISignUp';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  signIn(data: ISignIn): Promise<ISignInResponse>;
  signUp(data: ISignUp): Promise<ISignUpResponse>;
  findByEmail(email: string): Promise<IUser | null>;
  insertUserData(data: ICreateUser): Promise<void>;
}
