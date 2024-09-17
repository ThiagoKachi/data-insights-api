import { AppError } from '@shared/errors/AppError';
import { format, parse } from 'date-fns';

export class DateValidator {
  validate(date: Date): Date {
    const dateToString = date.toString();

    try {
      const parsedDate = parse(dateToString, 'dd/MM/yyyy', new Date());
      const formattedDate = format(parsedDate, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z');

      return new Date(formattedDate);
    } catch {
      throw new AppError('Invalid date');
    }
  }
}
