import React, { useState, useMemo } from 'react';
import { Transaction, Category, TransactionType, SavingsGoal } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SavingsGoals from './components/SavingsGoals';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Initial sample data
    { id: '1', date: '2023-10-01', description: 'Salary', amount: 3000, type: 'income', category: 'Salary' },
    { id: '2', date: '2023-10-01', description: 'Groceries', amount: 150, type: 'expense', category: 'Food' },
    { id: '3', date: '2023-10-02', description: 'Rent', amount: 1200, type: 'expense', category: 'Housing' },
    { id: '4', date: '2023-10-03', description: 'Freelance Work', amount: 500, type: 'income', category: 'Freelance' },
    { id: '5', date: '2023-10-05', description: 'Dinner Out', amount: 75, type: 'expense', category: 'Entertainment' },
    { id: '6', date: '2023-10-07', description: 'Gasoline', amount: 40, type: 'expense', category: 'Transport' },
  ]);

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
      { id: 'sg1', name: 'Vacation Fund', targetAmount: 2000, currentAmount: 500 },
      { id: 'sg2', name: 'New Laptop', targetAmount: 1500, currentAmount: 1100 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
  }, [transactions]);
  
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions(prev => [newTransaction, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
    closeEditModal();
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  const openEditModal = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const closeEditModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id'>) => {
      const newGoal: SavingsGoal = { ...goal, id: crypto.randomUUID() };
      setSavingsGoals(prev => [...prev, newGoal]);
  };

  const updateSavingsGoal = (updatedGoal: SavingsGoal) => {
      setSavingsGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  const deleteSavingsGoal = (id: string) => {
      setSavingsGoals(prev => prev.filter(g => g.id !== id));
  };


  return (
    <div className="min-h-screen bg-light dark:bg-dark text-gray-800 dark:text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <Dashboard
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          transactions={transactions}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <TransactionForm onSubmit={addTransaction} />
            <TransactionList transactions={transactions} onDelete={deleteTransaction} onEdit={openEditModal} />
          </div>
          <div>
            <SavingsGoals 
              goals={savingsGoals}
              onAddGoal={addSavingsGoal}
              onUpdateGoal={updateSavingsGoal}
              onDeleteGoal={deleteSavingsGoal}
              />
          </div>
        </div>
      </main>
      {isModalOpen && editingTransaction && (
        <Modal onClose={closeEditModal} title="Edit Transaction">
          <TransactionForm 
            transactionToEdit={editingTransaction}
            onSubmit={(transactionData) => {
                updateTransaction({ ...transactionData, id: editingTransaction.id });
            }} 
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
