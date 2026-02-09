
import React from 'react';
import { Transaction } from '../types';
import { ICONS } from '../constants';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<{ transaction: Transaction, onDelete: (id: string) => void, onEdit: (transaction: Transaction) => void }> = ({ transaction, onDelete, onEdit }) => {
  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? 'text-green-500' : 'text-red-500';
  const amountPrefix = isIncome ? '+' : '-';

  return (
    <li className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
            {isIncome ? ICONS.income : ICONS.expense}
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-gray-100">{transaction.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(transaction.date).toLocaleDateString()} &bull; {transaction.category}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className={`font-bold text-lg ${amountColor}`}>
          {amountPrefix}{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
        <div className="flex space-x-2">
            <button onClick={() => onEdit(transaction)} className="p-2 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                {ICONS.pencil}
            </button>
            <button onClick={() => onDelete(transaction.id)} className="p-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                {ICONS.trash}
            </button>
        </div>
      </div>
    </li>
  );
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      {transactions.length > 0 ? (
        <ul className="space-y-3">
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No transactions yet. Add one above to get started!</p>
      )}
    </div>
  );
};

export default TransactionList;
