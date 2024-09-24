import { format, parseISO } from 'date-fns';
import Handlebars from 'handlebars';

Handlebars.registerHelper('map', function(array, options) {
  const result = array.map((item: any) => options.fn(item));
  return result.join('');
});

Handlebars.registerHelper('formatDate', function(dateString: string) {
  const date = parseISO(dateString);
  return format(date, 'dd/MM/yyyy');
});

Handlebars.registerHelper('truncate', function(description: string) {
  if (description.length <= 80) {
    return description;
  }

  return description.substring(0, 80) + '...';
});

Handlebars.registerHelper('type', function(type: string) {
  switch (type) {
  case 'income':
    return 'Entrada';
  case 'outcome':
    return 'Saída';
  default:
    return 'Desconhecido';
  }
});

Handlebars.registerHelper('paymentType', function(type: string) {
  switch (type) {
  case 'credit_card':
    return 'Cartão de Crédito';
  case 'debit_card':
    return 'Cartão de Debito';
  case 'money':
    return 'Dinheiro';
  case 'pix':
    return 'Pix';
  case 'bank_slip':
    return 'Boleto';
  default:
    return 'Desconhecido';
  }
});
