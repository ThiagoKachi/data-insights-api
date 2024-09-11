import { PostgrestError, User } from '@supabase/supabase-js';

export interface IUser {
  data: {
    user: User;
  };
  error: PostgrestError | null;
}
