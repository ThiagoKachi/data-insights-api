interface IParams {
  initial_date?: string;
  final_date?: string;
  category?: string;
  type?: 'income' | 'outcome';
  payment_method?: 'credit_card' | 'debit_card' | 'money' | 'pix' | 'bank_slip';
  status?: 'pending' | 'paid' | 'canceled';
  entity?: string;
  responsible?: string;
  cost_center?: string;
}

export interface ITransactionRequest {
  searchParams?: IParams;
  pageSize: number;
  pageIndex: number;
  userId: string;
}
