import { Transaction, TransactionType, CategoryBreakdown, BalanceSummary, TimeSeriesData } from '../types';

// Generate a unique ID for transactions
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Format currency values
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // Remove decimal places for Rupees
  }).format(amount);
};

// Format date values
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Calculate balance summary (income, expense, balance)
export const calculateBalanceSummary = (transactions: Transaction[]): BalanceSummary => {
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );

  summary.balance = summary.income - summary.expense;
  return summary;
};

// Calculate category breakdown for visualization
export const calculateCategoryBreakdown = (
  transactions: Transaction[],
  type: TransactionType
): CategoryBreakdown[] => {
  // Filter transactions by type
  const filteredTransactions = transactions.filter((t) => t.type === type);
  
  // If no transactions, return empty array
  if (filteredTransactions.length === 0) return [];
  
  // Group transactions by category and sum amounts
  const categoryMap = filteredTransactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate total amount
  const total = Object.values(categoryMap).reduce((sum, amount) => sum + amount, 0);
  
  // Create category breakdown with percentages
  const breakdown = Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount,
    percentage: total > 0 ? (amount / total) * 100 : 0,
  }));
  
  // Sort by amount (descending)
  return breakdown.sort((a, b) => b.amount - a.amount);
};

// Calculate time series data for trending
export const calculateTimeSeriesData = (transactions: Transaction[]): TimeSeriesData[] => {
  if (transactions.length === 0) return [];
  
  // Group transactions by date
  const dateMap = transactions.reduce((acc, transaction) => {
    const date = transaction.date.split('T')[0];
    
    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0, balance: 0 };
    }
    
    if (transaction.type === 'income') {
      acc[date].income += transaction.amount;
    } else {
      acc[date].expense += transaction.amount;
    }
    
    acc[date].balance = acc[date].income - acc[date].expense;
    
    return acc;
  }, {} as Record<string, TimeSeriesData>);
  
  // Convert to array and sort by date
  return Object.values(dateMap).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

// Get color for category
export const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    salary: '#3B82F6', // blue
    investment: '#10B981', // green
    'side-hustle': '#8B5CF6', // purple
    gift: '#F472B6', // pink
    food: '#F59E0B', // amber
    transportation: '#6366F1', // indigo
    housing: '#EC4899', // pink
    utilities: '#64748B', // slate
    entertainment: '#F97316', // orange
    health: '#14B8A6', // teal
    education: '#8B5CF6', // purple
    shopping: '#EF4444', // red
    debt: '#9CA3AF', // gray
    savings: '#10B981', // green
    other: '#6B7280', // gray
  };
  
  return colorMap[category] || '#6B7280';
};

// Export transactions to CSV
export const exportToCSV = (transactions: Transaction[]): void => {
  // Define headers
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
  
  // Map transactions to CSV rows
  const rows = transactions.map(t => [
    t.date.split('T')[0],
    t.type,
    t.category,
    t.description,
    t.amount.toString()
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `financial-transactions-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

// Filter transactions by date range, category, and type
export const filterTransactions = (
  transactions: Transaction[],
  filters: {
    startDate?: string;
    endDate?: string;
    category?: string;
    type?: TransactionType;
  }
): Transaction[] => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    
    // Filter by start date
    if (filters.startDate && transactionDate < new Date(filters.startDate)) {
      return false;
    }
    
    // Filter by end date
    if (filters.endDate && transactionDate > new Date(filters.endDate)) {
      return false;
    }
    
    // Filter by category
    if (filters.category && filters.category !== 'all' && transaction.category !== filters.category) {
      return false;
    }
    
    // Filter by type
    if (filters.type && transaction.type !== filters.type) {
      return false;
    }
    
    return true;
  });
};