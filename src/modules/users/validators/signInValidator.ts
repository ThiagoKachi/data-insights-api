import { z } from 'zod';
import { ISignIn } from '../domain/models/ISignIn';

const signInValidatorSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignInValidator {
  validate(data: ISignIn) {
    return signInValidatorSchema.parse(data);
  }
}
