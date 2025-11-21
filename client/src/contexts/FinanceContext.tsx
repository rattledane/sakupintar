import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { storage, Transaction, Goal, Budget } from "@/lib/storage";

interface FinanceContextType {
  transactions: Transaction[];
  goals: Goal[];
  budgets: Budget[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, "id">) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addBudget: (budget: Omit<Budget, "id">) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  refreshData: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Initialize data from storage
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = useCallback(() => {
    const data = storage.getData();
    setTransactions(data.transactions);
    setGoals(data.goals);
    setBudgets(data.budgets);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    storage.addTransaction(transaction);
    refreshData();
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    storage.updateTransaction(id, updates);
    refreshData();
  };

  const deleteTransaction = (id: string) => {
    storage.deleteTransaction(id);
    refreshData();
  };

  const addGoal = (goal: Omit<Goal, "id">) => {
    storage.addGoal(goal);
    refreshData();
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    storage.updateGoal(id, updates);
    refreshData();
  };

  const deleteGoal = (id: string) => {
    storage.deleteGoal(id);
    refreshData();
  };

  const addBudget = (budget: Omit<Budget, "id">) => {
    storage.addBudget(budget);
    refreshData();
  };

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    storage.updateBudget(id, updates);
    refreshData();
  };

  const deleteBudget = (id: string) => {
    storage.deleteBudget(id);
    refreshData();
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        goals,
        budgets,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addGoal,
        updateGoal,
        deleteGoal,
        addBudget,
        updateBudget,
        deleteBudget,
        refreshData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }
  return context;
};
