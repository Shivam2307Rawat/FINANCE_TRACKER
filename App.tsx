import React, { useState, useEffect } from 'react';
import useTransactions from './hooks/useTransactions';
import { filterTransactions } from './utils/helpers';
import { Transaction } from './types';

// Components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import TransactionFilter from './components/TransactionFilter';
import ExportButton from './components/ExportButton';
import { ChartSection } from './components/ChartComponents';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'charts' | 'add'>('dashboard');
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'all',
    type: 'all',
  });
  
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    balanceSummary,
    expenseBreakdown,
    incomeBreakdown,
    generatePieChartData,
    generateTimeSeriesChartData,
  } = useTransactions();

  const filteredTransactions = filterTransactions(transactions, {
    startDate: filters.startDate,
    endDate: filters.endDate,
    category: filters.category !== 'all' ? filters.category : undefined,
    type: filters.type !== 'all' ? filters.type as 'income' | 'expense' : undefined,
  });

  // When 'add' tab is selected, show the add transaction form
  useEffect(() => {
    if (activeTab === 'add') {
      setShowAddTransaction(true);
    } else {
      setShowAddTransaction(false);
    }
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tab: 'dashboard' | 'transactions' | 'charts' | 'add') => {
    setActiveTab(tab);
  };

  // Handle adding a transaction
  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    addTransaction(transaction);
    if (activeTab === 'add') {
      setActiveTab('transactions');
    } else {
      setShowAddTransaction(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <Dashboard
              balanceSummary={balanceSummary}
              expenseBreakdown={expenseBreakdown}
              incomeBreakdown={incomeBreakdown}
            />
            
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors duration-200"
                >
                  Add Transaction
                </button>
              </div>
              
              {showAddTransaction && (
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Transaction</h3>
                  <TransactionForm
                    onAddTransaction={handleAddTransaction}
                    onCancel={() => setShowAddTransaction(false)}
                  />
                </div>
              )}
              
              <TransactionList
                transactions={transactions.slice(0, 5)}
                onDeleteTransaction={deleteTransaction}
                onUpdateTransaction={updateTransaction}
              />
              
              {transactions.length > 5 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Transactions
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
              <div className="flex space-x-3">
                <ExportButton transactions={filteredTransactions} />
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors duration-200"
                >
                  Add Transaction
                </button>
              </div>
            </div>
            
            {showAddTransaction && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Transaction</h3>
                <TransactionForm
                  onAddTransaction={handleAddTransaction}
                  onCancel={() => setShowAddTransaction(false)}
                />
              </div>
            )}
            
            <TransactionFilter onFilterChange={handleFilterChange} />
            
            <TransactionList
              transactions={filteredTransactions}
              onDeleteTransaction={deleteTransaction}
              onUpdateTransaction={updateTransaction}
            />
          </div>
        )}
        
        {/* Charts Tab */}
        {activeTab === 'charts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial Charts</h2>
            
            <ChartSection
              expenseChartData={generatePieChartData('expense')}
              incomeChartData={generatePieChartData('income')}
              timeSeriesChartData={generateTimeSeriesChartData()}
            />
          </div>
        )}
        
        {/* Add Transaction Tab */}
        {activeTab === 'add' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Transaction</h2>
            <TransactionForm
              onAddTransaction={handleAddTransaction}
            />
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Financial Tracker &copy; {new Date().getFullYear()} | Keep track of your finances wisely
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;