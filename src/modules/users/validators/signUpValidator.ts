import { z } from 'zod';
import { ISignIn } from '../domain/models/ISignIn';

const signUpValidatorSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignUpValidator {
  validate(data: ISignIn) {
    return signUpValidatorSchema.parse(data);
  }
}
