import { ISignIn, ISignInResponse } from '../models/ISignIn';

export interface IUsersRepository {
  signIn(data: ISignIn): Promise<ISignInResponse>;
}
