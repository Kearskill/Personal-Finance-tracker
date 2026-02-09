
import React, { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '../types';
import { CATEGORIES } from '../constants';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  transactionToEdit?: Transaction | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, transactionToEdit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<Category>('Food');

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(String(transactionToEdit.amount));
      setDate(transactionToEdit.date);
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
    } else {
        resetForm();
    }
  }, [transactionToEdit]);

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setType('expense');
    setCategory('Food');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date || !category) {
      alert('Please fill all fields');
      return;
    }
    onSubmit({
      description,
      amount: parseFloat(amount),
      date,
      type,
      category
    });
    if (!transactionToEdit) {
        resetForm();
    }
  };
  
  const filteredCategories = CATEGORIES.filter(c => c.type === type);

  useEffect(() => {
    if (!filteredCategories.some(c => c.name === category)) {
        setCategory(filteredCategories[0]?.name as Category || 'Other');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, filteredCategories]);


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">{transactionToEdit ? 'Edit' : 'Add New'} Transaction</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="e.g., Coffee"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="0.00"
            min="0.01"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <div className="w-1/2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
            <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
          </div>
          <div className="w-1/2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
                {filteredCategories.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors duration-300 md:col-start-1 lg:col-start-auto"
        >
          {transactionToEdit ? 'Save Changes' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
