import React, { useState } from 'react';
import { Transaction, TransactionType, TransactionCategory } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel?: () => void;
  initialValues?: Partial<Transaction>;
  isEdit?: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  onCancel,
  initialValues = {},
  isEdit = false,
}) => {
  const [type, setType] = useState<TransactionType>(initialValues.type || 'expense');
  const [amount, setAmount] = useState(initialValues.amount?.toString() || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [category, setCategory] = useState<TransactionCategory>(initialValues.category || 'other');
  const [date, setDate] = useState(initialValues.date?.split('T')[0] || new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const incomeCategories: TransactionCategory[] = [
    'salary',
    'investment',
    'side-hustle',
    'gift',
    'other',
  ];

  const expenseCategories: TransactionCategory[] = [
    'food',
    'transportation',
    'housing',
    'utilities',
    'entertainment',
    'health',
    'education',
    'shopping',
    'debt',
    'savings',
    'other',
  ];

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onAddTransaction({
      amount: Number(amount),
      description,
      category,
      type,
      date: new Date(date).toISOString(),
    });

    // Reset form if not editing
    if (!isEdit) {
      setAmount('');
      setDescription('');
      setCategory(type === 'income' ? 'salary' : 'food');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    // Reset category when type changes
    setCategory(newType === 'income' ? 'salary' : 'food');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <div className="flex rounded-md overflow-hidden">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                type === 'income'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                type === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`block w-full pl-7 pr-12 py-2 sm:text-sm rounded-md ${
                errors.amount ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="0"
              step="1"
              min="0"
            />
          </div>
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`block w-full py-2 px-3 sm:text-sm rounded-md ${
            errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder="Enter description"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className={`block w-full py-2 px-3 sm:text-sm rounded-md ${
              errors.category ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`block w-full py-2 px-3 sm:text-sm rounded-md ${
              errors.date ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isEdit ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;