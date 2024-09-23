interface ITransactionBody {
  date: string;
  entity: string;
  description: string;
  value: number;
  payment_method: string;
}

interface ITaxesBody {
  date: string;
  transaction_value: number;
  taxes: number;
}

export interface ITransactionReportResponse {
  initialPeriod: string;
  finalPeriod: string;
  totalRevenue: number;
  totalExpenses: number;
  finalBalance: number;
  totalTaxes: number;
  transactions: {
    date: string;
    description: string;
    type: string;
    value: number;
    payment_method: string;
  }[];
  revenues: ITransactionBody[] | null;
  expenses: ITransactionBody[] | null;
  taxes: ITaxesBody[] | null;
}
