import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import { 
  Transaction, 
  BalanceSummary, 
  CategoryBreakdown, 
  TimeSeriesData, 
  ChartData,
  TransactionType
} from '../types';
import { 
  generateId, 
  calculateBalanceSummary, 
  calculateCategoryBreakdown, 
  calculateTimeSeriesData,
  getCategoryColor 
} from '../utils/helpers';

const useTransactions = () => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('financial-tracker-transactions', []);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: generateId(),
    };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prevTransactions) => 
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  // Update a transaction
  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  // Calculate balance summary
  const balanceSummary = useMemo<BalanceSummary>(
    () => calculateBalanceSummary(transactions),
    [transactions]
  );

  // Calculate category breakdown for expenses
  const expenseBreakdown = useMemo<CategoryBreakdown[]>(
    () => calculateCategoryBreakdown(transactions, 'expense'),
    [transactions]
  );

  // Calculate category breakdown for income
  const incomeBreakdown = useMemo<CategoryBreakdown[]>(
    () => calculateCategoryBreakdown(transactions, 'income'),
    [transactions]
  );

  // Calculate time series data
  const timeSeriesData = useMemo<TimeSeriesData[]>(
    () => calculateTimeSeriesData(transactions),
    [transactions]
  );

  // Generate pie chart data for a given transaction type
  const generatePieChartData = (type: TransactionType): ChartData => {
    const breakdown = type === 'expense' ? expenseBreakdown : incomeBreakdown;
    
    return {
      labels: breakdown.map((item) => item.category),
      datasets: [
        {
          label: type === 'expense' ? 'Expenses' : 'Income',
          data: breakdown.map((item) => item.amount),
          backgroundColor: breakdown.map((item) => getCategoryColor(item.category)),
          borderWidth: 1,
        },
      ],
    };
  };

  // Generate time series chart data
  const generateTimeSeriesChartData = (): ChartData => {
    return {
      labels: timeSeriesData.map((data) => data.date),
      datasets: [
        {
          label: 'Income',
          data: timeSeriesData.map((data) => data.income),
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 2,
        },
        {
          label: 'Expenses',
          data: timeSeriesData.map((data) => data.expense),
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 2,
        },
        {
          label: 'Balance',
          data: timeSeriesData.map((data) => data.balance),
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
        },
      ],
    };
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    balanceSummary,
    expenseBreakdown,
    incomeBreakdown,
    timeSeriesData,
    generatePieChartData,
    generateTimeSeriesChartData,
  };
};

export default useTransactions;