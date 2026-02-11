import React, { useState } from 'react';
import { SavingsGoal } from '../types';
import { ICONS } from '../constants';
import Modal from './Modal';

interface SavingsGoalsProps {
  goals: SavingsGoal[];
  onAddGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  onUpdateGoal: (goal: SavingsGoal) => void;
  onDeleteGoal: (id: string) => void;
}

const GoalForm: React.FC<{ onSubmit: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'> & { currentAmount: number }) => void; goalToEdit?: SavingsGoal | null }> = ({ onSubmit, goalToEdit }) => {
    const [name, setName] = useState(goalToEdit?.name || '');
    const [targetAmount, setTargetAmount] = useState(goalToEdit?.targetAmount.toString() || '');
    const [currentAmount, setCurrentAmount] = useState(goalToEdit?.currentAmount.toString() || '0');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !targetAmount) return;
        onSubmit({ name, targetAmount: parseFloat(targetAmount), currentAmount: parseFloat(currentAmount) });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="goalName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Goal Name</label>
                <input type="text" id="goalName" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Amount ($)</label>
                <input type="number" id="targetAmount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} min="1" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Amount ($)</label>
                <input type="number" id="currentAmount" value={currentAmount} onChange={e => setCurrentAmount(e.target.value)} min="0" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" required />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors duration-300">{goalToEdit ? 'Save Changes' : 'Add Goal'}</button>
        </form>
    );
};

const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals, onAddGoal, onUpdateGoal, onDeleteGoal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);

  const handleAddGoal = (goalData: Omit<SavingsGoal, 'id'>) => {
    onAddGoal(goalData);
    setIsModalOpen(false);
  };
  
  const handleUpdateGoal = (goalData: Omit<SavingsGoal, 'id'>) => {
      if(editingGoal){
        onUpdateGoal({ ...goalData, id: editingGoal.id });
        setEditingGoal(null);
        setIsModalOpen(false);
      }
  };

  const openEditModal = (goal: SavingsGoal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Savings Goals</h3>
        <button onClick={() => { setEditingGoal(null); setIsModalOpen(true); }} className="p-2 rounded-full bg-primary text-white hover:bg-indigo-700 transition-colors">
          {ICONS.plus}
        </button>
      </div>
      <div className="space-y-4">
        {goals.map(goal => {
          const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
          return (
            <div key={goal.id}>
              <div className="flex justify-between items-end mb-1">
                <span className="font-medium">{goal.name}</span>
                 <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{progress.toFixed(0)}%</span>
                    <button onClick={() => openEditModal(goal)} className="text-gray-400 hover:text-blue-500">{ICONS.pencil}</button>
                    <button onClick={() => onDeleteGoal(goal.id)} className="text-gray-400 hover:text-red-500">{ICONS.trash}</button>
                 </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div className="bg-secondary h-4 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
              </div>
            </div>
          );
        })}
        {goals.length === 0 && (
             <p className="text-center text-gray-500 dark:text-gray-400 py-8">No savings goals yet. Add one to start saving!</p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => { setIsModalOpen(false); setEditingGoal(null); }} title={editingGoal ? "Edit Savings Goal" : "Add Savings Goal"}>
            <GoalForm onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal} goalToEdit={editingGoal} />
        </Modal>
      )}
    </div>
  );
};

export default SavingsGoals;
