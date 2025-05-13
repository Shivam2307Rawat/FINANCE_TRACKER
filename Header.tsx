import React from 'react';
import { BarChartBig, CreditCard, Home, PieChart } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'transactions' | 'charts' | 'add';
  onTabChange: (tab: 'dashboard' | 'transactions' | 'charts' | 'add') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-blue-600">
                <CreditCard size={32} />
              </span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">Financial Tracker</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {[
              { name: 'Dashboard', value: 'dashboard', icon: <Home size={18} /> },
              { name: 'Transactions', value: 'transactions', icon: <CreditCard size={18} /> },
              { name: 'Charts', value: 'charts', icon: <PieChart size={18} /> },
              { name: 'Add Transaction', value: 'add', icon: <span className="text-lg">+</span> },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => onTabChange(item.value as 'dashboard' | 'transactions' | 'charts' | 'add')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === item.value
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                } transition-colors duration-200`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
          
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value as 'dashboard' | 'transactions' | 'charts' | 'add')}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="dashboard">Dashboard</option>
              <option value="transactions">Transactions</option>
              <option value="charts">Charts</option>
              <option value="add">Add Transaction</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;