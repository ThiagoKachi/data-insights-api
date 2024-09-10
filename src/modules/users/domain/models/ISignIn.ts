import { AuthError, Session, User, WeakPassword } from '@supabase/supabase-js';

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignInResponse {
  data: {
    user: User | null;
    session: Session | null;
    weakPassword: WeakPassword | undefined;
  };
  error?: AuthError | null;
}
