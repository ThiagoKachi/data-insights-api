import { format, parse, parseISO } from 'date-fns';

export function convertDateToUSFormat(dateString: string): string {
  const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());

  return format(parsedDate, 'MM/dd/yyyy');
}

export function convertDateToISOFormat(dateString: string): string {
  const parsedDate = parseISO(dateString);

  return format(parsedDate, 'dd/MM/yyyy');
}
