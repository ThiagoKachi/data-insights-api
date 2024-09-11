import { AuthError, Session, User } from '@supabase/supabase-js';

export interface ISignUp {
  email: string;
  password: string;
}

export interface ISignUpResponse {
  data: {
    user: User | null;
    session: Session | null;
  };
  error?: AuthError | null;
}
