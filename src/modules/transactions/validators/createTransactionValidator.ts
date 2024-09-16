import { z } from 'zod';
import { ICreateTransaction } from '../domain/models/ICreateTransaction';

const transactionValidatorSchema = z.object({
  email: z.string().email(),
  password_hash: z.string().min(6),
  name: z.string().min(6),
  transaction_date: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  type: z.string().min(1),
  value: z.number().min(0.01),
  payment_method: z.string().min(1),
  status: z.string().min(1),
  entity: z.string().min(1),
  invoice_number: z.string().optional(),
  responsible: z.string().min(1),
  cost_center: z.string().min(1),
  due_date: z.string().optional(),
  taxes: z.number().optional(),
});

export class CreateTransactionValidator {
  validate(data: ICreateTransaction) {
    return transactionValidatorSchema.parse(data);
  }
}
