import React from 'react';
import { formatCurrency } from '../utils/helpers';
import { BalanceSummary, CategoryBreakdown } from '../types';
import { ArrowDownCircle, ArrowUpCircle, DollarSign, TrendingUp } from 'lucide-react';

interface DashboardProps {
  balanceSummary: BalanceSummary;
  expenseBreakdown: CategoryBreakdown[];
  incomeBreakdown: CategoryBreakdown[];
}

const Dashboard: React.FC<DashboardProps> = ({
  balanceSummary,
  expenseBreakdown,
  incomeBreakdown,
}) => {
  const topExpenses = expenseBreakdown.slice(0, 5);
  const topIncome = incomeBreakdown.slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {/* Balance Card */}
      <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Current Balance</p>
            <h3 className={`text-2xl font-bold ${
              balanceSummary.balance >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              {formatCurrency(balanceSummary.balance)}
            </h3>
          </div>
        </div>
      </div>

      {/* Income Card */}
      <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <ArrowUpCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Income</p>
            <h3 className="text-2xl font-bold text-green-600">
              {formatCurrency(balanceSummary.income)}
            </h3>
          </div>
        </div>
      </div>

      {/* Expense Card */}
      <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
            <ArrowDownCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <h3 className="text-2xl font-bold text-red-600">
              {formatCurrency(balanceSummary.expense)}
            </h3>
          </div>
        </div>
      </div>

      {/* Savings Rate Card */}
      <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Savings Rate</p>
            <h3 className="text-2xl font-bold text-purple-600">
              {balanceSummary.income > 0
                ? `${Math.round((1 - balanceSummary.expense / balanceSummary.income) * 100)}%`
                : '0%'}
            </h3>
          </div>
        </div>
      </div>

      {/* Top Expenses */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Expenses</h3>
        {topExpenses.length > 0 ? (
          <div className="space-y-4">
            {topExpenses.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: getCategoryColorHex(item.category) }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900 mr-2">
                    {formatCurrency(item.amount)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No expense data available.</p>
        )}
      </div>

      {/* Top Income */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Income Sources</h3>
        {topIncome.length > 0 ? (
          <div className="space-y-4">
            {topIncome.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: getCategoryColorHex(item.category) }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900 mr-2">
                    {formatCurrency(item.amount)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No income data available.</p>
        )}
      </div>
    </div>
  );
};

// Helper function to get category color
const getCategoryColorHex = (category: string): string => {
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

export default Dashboard;