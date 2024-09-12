import { z } from 'zod';
import { ISignUp } from '../domain/models/ISignUp';

const signUpValidatorSchema = z.object({
  email: z.string().email(),
  password_hash: z.string().min(6),
  name: z.string().min(6),
});

export class SignUpValidator {
  validate(data: ISignUp) {
    return signUpValidatorSchema.parse(data);
  }
}
