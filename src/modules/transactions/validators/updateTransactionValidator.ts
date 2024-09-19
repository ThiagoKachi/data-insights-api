import { AppError } from '@shared/errors/AppError';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { IUpdateTransaction } from '../domain/models/IUpdateTransaction';

const transactionValidatorSchema = z.object({
  category: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['income', 'outcome']).optional(),
  value: z.number().min(0.01).optional(),
  payment_method: z
    .enum(['credit_card', 'debit_card', 'money', 'pix', 'bank_slip']).optional(),
  status: z.enum(['pending', 'paid', 'canceled']).optional(),
  responsible: z.string().optional(),
  cost_center: z.string().optional(),
  due_date: z.string().optional(),
  taxes: z.number().optional(),
});

export class UpdateTransactionValidator {
  public async validate(data: IUpdateTransaction) {
    try {
      return transactionValidatorSchema.parse(data);
    } catch (error) {
      throw new AppError(fromError(error)['message']);
    }
  }
}
