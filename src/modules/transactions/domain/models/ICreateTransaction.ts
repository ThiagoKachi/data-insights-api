export interface ICreateTransaction {
  transaction_date: Date;
  category: string;
  description: string;
  type: string;
  value: number;
  payment_method: string;
  status: string;
  entity: string;
  invoice_number: string | null;
  responsible: string;
  cost_center: string;
  due_date: Date | null;
  taxes: number | null;
  file_id: string;
}

export interface ICreateTransactionResponse {
  id: string;
}
