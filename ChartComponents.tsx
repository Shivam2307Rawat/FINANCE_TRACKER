import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { ChartData, TransactionType } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface PieChartProps {
  data: ChartData;
  title: string;
}

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12,
          },
          boxWidth: 15,
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      {data.labels.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No data available to display</p>
        </div>
      )}
    </div>
  );
};

interface LineChartProps {
  data: ChartData;
  title: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      {data.labels.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No data available to display</p>
        </div>
      )}
    </div>
  );
};

interface BarChartProps {
  data: ChartData;
  title: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      {data.labels.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No data available to display</p>
        </div>
      )}
    </div>
  );
};

interface ChartSectionProps {
  expenseChartData: ChartData;
  incomeChartData: ChartData;
  timeSeriesChartData: ChartData;
}

export const ChartSection: React.FC<ChartSectionProps> = ({
  expenseChartData,
  incomeChartData,
  timeSeriesChartData,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <LineChart data={timeSeriesChartData} title="Income vs Expenses Over Time" />
      </div>
      <div>
        <PieChart data={expenseChartData} title="Expense Breakdown" />
      </div>
      <div>
        <PieChart data={incomeChartData} title="Income Sources" />
      </div>
    </div>
  );
};