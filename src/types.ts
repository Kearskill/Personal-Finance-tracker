export type TransactionType = 'income' | 'expense';

export type Category = 'Salary' | 'Freelance' | 'Food' | 'Housing' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}
