// Local storage management utilities

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod?: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  color?: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
}

export interface FinancialData {
  user: User | null;
  transactions: Transaction[];
  goals: Goal[];
  budgets: Budget[];
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'sakupintar_data';
const DEFAULT_DATA: FinancialData = {
  user: null,
  transactions: [],
  goals: [],
  budgets: [],
  isAuthenticated: false,
};

export const storage = {
  // Initialize storage with default data if empty
  init: () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    }
  },

  // Get all data
  getData: (): FinancialData => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_DATA;
  },

  // Save all data
  saveData: (data: FinancialData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // User operations
  setUser: (user: User) => {
    const data = storage.getData();
    data.user = user;
    storage.saveData(data);
  },

  getUser: (): User | null => {
    return storage.getData().user;
  },

  setAuthenticated: (isAuthenticated: boolean) => {
    const data = storage.getData();
    data.isAuthenticated = isAuthenticated;
    storage.saveData(data);
  },

  isAuthenticated: (): boolean => {
    return storage.getData().isAuthenticated;
  },

  // Transaction operations
  addTransaction: (transaction: Omit<Transaction, 'id'>) => {
    const data = storage.getData();
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    data.transactions.push(newTransaction);
    storage.saveData(data);
    return newTransaction;
  },

  getTransactions: (): Transaction[] => {
    return storage.getData().transactions;
  },

  updateTransaction: (id: string, updates: Partial<Transaction>) => {
    const data = storage.getData();
    const index = data.transactions.findIndex((t) => t.id === id);
    if (index !== -1) {
      data.transactions[index] = { ...data.transactions[index], ...updates };
      storage.saveData(data);
    }
  },

  deleteTransaction: (id: string) => {
    const data = storage.getData();
    data.transactions = data.transactions.filter((t) => t.id !== id);
    storage.saveData(data);
  },

  // Goal operations
  addGoal: (goal: Omit<Goal, 'id'>) => {
    const data = storage.getData();
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };
    data.goals.push(newGoal);
    storage.saveData(data);
    return newGoal;
  },

  getGoals: (): Goal[] => {
    return storage.getData().goals;
  },

  updateGoal: (id: string, updates: Partial<Goal>) => {
    const data = storage.getData();
    const index = data.goals.findIndex((g) => g.id === id);
    if (index !== -1) {
      data.goals[index] = { ...data.goals[index], ...updates };
      storage.saveData(data);
    }
  },

  deleteGoal: (id: string) => {
    const data = storage.getData();
    data.goals = data.goals.filter((g) => g.id !== id);
    storage.saveData(data);
  },

  // Budget operations
  addBudget: (budget: Omit<Budget, 'id'>) => {
    const data = storage.getData();
    const newBudget: Budget = {
      ...budget,
      id: Date.now().toString(),
    };
    data.budgets.push(newBudget);
    storage.saveData(data);
    return newBudget;
  },

  getBudgets: (): Budget[] => {
    return storage.getData().budgets;
  },

  updateBudget: (id: string, updates: Partial<Budget>) => {
    const data = storage.getData();
    const index = data.budgets.findIndex((b) => b.id === id);
    if (index !== -1) {
      data.budgets[index] = { ...data.budgets[index], ...updates };
      storage.saveData(data);
    }
  },

  deleteBudget: (id: string) => {
    const data = storage.getData();
    data.budgets = data.budgets.filter((b) => b.id !== id);
    storage.saveData(data);
  },

  // Clear all data
  clearAll: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
  },
};
