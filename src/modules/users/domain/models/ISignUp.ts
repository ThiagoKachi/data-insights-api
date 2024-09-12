export interface ISignUp {
  email: string;
  password_hash: string;
  name: string;
}

export interface ISignUpResponse {
  id: string;
  name: string;
  email: string;
  password_hash: string | undefined;
  created_at: Date;
}
