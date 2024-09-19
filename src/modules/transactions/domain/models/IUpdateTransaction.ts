export interface IUpdateTransaction {
  category?: string;
  description?: string;
  type?: string;
  value?: number;
  payment_method?: string;
  status?: string;
  responsible?: string;
  cost_center?: string;
  due_date?: Date | null;
  taxes?: number | null;
}
