
import React from 'react';
import { Transaction } from '../types';
import CategoryBreakdownChart from './CategoryBreakdownChart';
import IncomeExpenseChart from './IncomeExpenseChart';

interface DashboardProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
}

const StatCard: React.FC<{ title: string; amount: number; colorClass: string }> = ({ title, amount, colorClass }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <p className={`text-3xl font-bold mt-2 ${colorClass}`}>
      {amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    </p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ balance, totalIncome, totalExpenses, transactions }) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Current Balance" amount={balance} colorClass="text-primary dark:text-indigo-400" />
        <StatCard title="Total Income" amount={totalIncome} colorClass="text-secondary dark:text-green-400" />
        <StatCard title="Total Expenses" amount={totalExpenses} colorClass="text-danger dark:text-red-400" />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Income vs. Expenses</h3>
          <IncomeExpenseChart income={totalIncome} expense={totalExpenses} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Expense Breakdown</h3>
          <CategoryBreakdownChart transactions={transactions} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
