
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface IncomeExpenseChartProps {
  income: number;
  expense: number;
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ income, expense }) => {
  const data = [
    { name: 'Financials', income: income, expense: expense },
  ];
  
  if (income === 0 && expense === 0) {
     return <div className="flex items-center justify-center h-64 text-gray-500">No income or expense data to display.</div>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip
          formatter={(value: number | undefined) => {
            if (value === undefined) return '$0';

            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            });
            }}
          />

          <Legend />
          <Bar dataKey="income" fill="#10B981" />
          <Bar dataKey="expense" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;
