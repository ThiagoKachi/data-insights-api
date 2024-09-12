import { ISignUp, ISignUpResponse } from '../models/ISignUp';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  signUp(data: ISignUp): Promise<ISignUpResponse>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  updatePassword(id: string, password: string): Promise<void>;
}
