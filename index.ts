export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'salary'
  | 'investment'
  | 'side-hustle'
  | 'gift'
  | 'food'
  | 'transportation'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'shopping'
  | 'debt'
  | 'savings'
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  date: string;
}

export interface BalanceSummary {
  income: number;
  expense: number;
  balance: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

export interface TimeSeriesData {
  date: string;
  income: number;
  expense: number;
  balance: number;
}