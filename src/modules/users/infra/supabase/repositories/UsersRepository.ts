import { ISignIn, ISignInResponse } from '@modules/users/domain/models/ISignIn';
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
}
