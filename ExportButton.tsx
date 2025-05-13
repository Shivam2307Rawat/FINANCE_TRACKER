import React from 'react';
import { Transaction } from '../types';
import { exportToCSV } from '../utils/helpers';

interface ExportButtonProps {
  transactions: Transaction[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ transactions }) => {
  const handleExport = () => {
    exportToCSV(transactions);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors duration-200 flex items-center"
      disabled={transactions.length === 0}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      Export CSV
    </button>
  );
};

export default ExportButton;