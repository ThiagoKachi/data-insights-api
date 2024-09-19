import { format, parse } from 'date-fns';

export function convertDateToUSFormat(dateString: string): string {
  const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());

  return format(parsedDate, 'MM/dd/yyyy');
}
