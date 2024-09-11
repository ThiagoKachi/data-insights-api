import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { ISignIn, ISignInResponse } from '@modules/users/domain/models/ISignIn';
import { ISignUp, ISignUpResponse } from '@modules/users/domain/models/ISignUp';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { supabase } from '@shared/infra/libs/supabaseClient';
import { SupabaseClient } from '@supabase/supabase-js';

export class UsersRepository implements IUsersRepository {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = supabase;
  }

  public async signIn(userData: ISignIn): Promise<ISignInResponse> {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword(userData);

    return {
      data: {
        user: data?.user ?? null,
        session: data?.session ?? null,
        weakPassword: data?.weakPassword ?? undefined,
      },
      error,
    };
  }

  public async signUp(userData: ISignUp): Promise<ISignUpResponse> {
    const { data, error } = await this.supabaseClient.auth.signUp(userData);

    return {
      data: {
        user: data?.user ?? null,
        session: data?.session ?? null,
      },
      error,
    };
  }

  public async insertUserData(userData: ICreateUser): Promise<void> {
    const { error } = await this.supabaseClient.from('users').upsert(userData);

    console.log(error, 'fora');
    if (error) {
      console.log(error, 'dentro');
    }
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('email', email);

    return {
      data: {
        user: data?.[0] ?? null,
      },
      error,
    };
  }
}
