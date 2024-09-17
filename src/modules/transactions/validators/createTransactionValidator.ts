import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { ICreateTransaction } from '../domain/models/ICreateTransaction';

const transactionValidatorSchema = z.object({
  transaction_date: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['income', 'outcome']),
  value: z.number().min(0.01),
  payment_method: z.enum(['credit_card', 'debit_card', 'money', 'pix', 'bank_slip']),
  status: z.enum(['pending', 'paid', 'canceled']),
  entity: z.string().min(1),
  invoice_number: z.string().optional(),
  responsible: z.string().min(1),
  cost_center: z.string().min(1),
  due_date: z.string().optional(),
  taxes: z.number().optional(),
});

export class CreateTransactionValidator {
  validate(data: ICreateTransaction) {
    try {
      return transactionValidatorSchema.parse(data);
    } catch (error) {
      throw fromError(error);
    }
  }
}
