import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { storage } from "@/lib/storage";

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("Storage Management", () => {
  beforeEach(() => {
    localStorageMock.clear();
    storage.init();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe("Initialization", () => {
    it("should initialize storage with default data", () => {
      const data = storage.getData();
      expect(data).toBeDefined();
      expect(data.user).toBeNull();
      expect(data.transactions).toEqual([]);
      expect(data.goals).toEqual([]);
      expect(data.budgets).toEqual([]);
      expect(data.isAuthenticated).toBe(false);
    });
  });

  describe("User Operations", () => {
    it("should set and get user", () => {
      const user = {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        avatar: "https://example.com/avatar.jpg",
      };

      storage.setUser(user);
      const retrievedUser = storage.getUser();

      expect(retrievedUser).toEqual(user);
    });

    it("should set authentication status", () => {
      storage.setAuthenticated(true);
      expect(storage.isAuthenticated()).toBe(true);

      storage.setAuthenticated(false);
      expect(storage.isAuthenticated()).toBe(false);
    });
  });

  describe("Transaction Operations", () => {
    it("should add transaction", () => {
      const transaction = {
        type: "income" as const,
        amount: 1000000,
        category: "Salary",
        description: "Monthly salary",
        date: "2024-01-01",
      };

      const added = storage.addTransaction(transaction);

      expect(added.id).toBeDefined();
      expect(added.amount).toBe(1000000);
      expect(storage.getTransactions()).toHaveLength(1);
    });

    it("should update transaction", () => {
      const transaction = {
        type: "expense" as const,
        amount: 50000,
        category: "Food",
        description: "Lunch",
        date: "2024-01-01",
      };

      const added = storage.addTransaction(transaction);
      storage.updateTransaction(added.id, { amount: 75000 });

      const updated = storage.getTransactions()[0];
      expect(updated.amount).toBe(75000);
    });

    it("should delete transaction", () => {
      const transaction = {
        type: "expense" as const,
        amount: 50000,
        category: "Food",
        description: "Lunch",
        date: "2024-01-01",
      };

      const added = storage.addTransaction(transaction);
      expect(storage.getTransactions()).toHaveLength(1);

      storage.deleteTransaction(added.id);
      expect(storage.getTransactions()).toHaveLength(0);
    });
  });

  describe("Goal Operations", () => {
    it("should add goal", () => {
      const goal = {
        name: "MacBook Pro",
        targetAmount: 20000000,
        currentAmount: 5000000,
        deadline: "2024-12-31",
        category: "Electronics",
      };

      const added = storage.addGoal(goal);

      expect(added.id).toBeDefined();
      expect(added.name).toBe("MacBook Pro");
      expect(storage.getGoals()).toHaveLength(1);
    });

    it("should update goal", () => {
      const goal = {
        name: "New Car",
        targetAmount: 300000000,
        currentAmount: 50000000,
        deadline: "2025-12-31",
        category: "Vehicles",
      };

      const added = storage.addGoal(goal);
      storage.updateGoal(added.id, { currentAmount: 100000000 });

      const updated = storage.getGoals()[0];
      expect(updated.currentAmount).toBe(100000000);
    });

    it("should delete goal", () => {
      const goal = {
        name: "Vacation",
        targetAmount: 10000000,
        currentAmount: 2000000,
        deadline: "2024-06-30",
        category: "Travel",
      };

      const added = storage.addGoal(goal);
      expect(storage.getGoals()).toHaveLength(1);

      storage.deleteGoal(added.id);
      expect(storage.getGoals()).toHaveLength(0);
    });
  });

  describe("Budget Operations", () => {
    it("should add budget", () => {
      const budget = {
        category: "Food & Groceries",
        amount: 2000000,
        spent: 0,
      };

      const added = storage.addBudget(budget);

      expect(added.id).toBeDefined();
      expect(added.category).toBe("Food & Groceries");
      expect(storage.getBudgets()).toHaveLength(1);
    });

    it("should update budget", () => {
      const budget = {
        category: "Entertainment",
        amount: 1000000,
        spent: 0,
      };

      const added = storage.addBudget(budget);
      storage.updateBudget(added.id, { spent: 500000 });

      const updated = storage.getBudgets()[0];
      expect(updated.spent).toBe(500000);
    });

    it("should delete budget", () => {
      const budget = {
        category: "Shopping",
        amount: 5000000,
        spent: 0,
      };

      const added = storage.addBudget(budget);
      expect(storage.getBudgets()).toHaveLength(1);

      storage.deleteBudget(added.id);
      expect(storage.getBudgets()).toHaveLength(0);
    });
  });

  describe("Data Persistence", () => {
    it("should persist data across multiple operations", () => {
      const transaction = {
        type: "income" as const,
        amount: 5000000,
        category: "Salary",
        description: "Monthly salary",
        date: "2024-01-01",
      };

      const goal = {
        name: "House",
        targetAmount: 500000000,
        currentAmount: 100000000,
        deadline: "2030-12-31",
        category: "Real Estate",
      };

      storage.addTransaction(transaction);
      storage.addGoal(goal);

      const data = storage.getData();
      expect(data.transactions).toHaveLength(1);
      expect(data.goals).toHaveLength(1);

      // Verify data is still there after retrieval
      const retrievedData = storage.getData();
      expect(retrievedData.transactions).toHaveLength(1);
      expect(retrievedData.goals).toHaveLength(1);
    });
  });

  describe("Clear All Data", () => {
    it("should clear all data", () => {
      storage.addTransaction({
        type: "income",
        amount: 1000000,
        category: "Salary",
        description: "Salary",
        date: "2024-01-01",
      });

      storage.addGoal({
        name: "Goal",
        targetAmount: 10000000,
        currentAmount: 0,
        deadline: "2024-12-31",
        category: "General",
      });

      storage.clearAll();

      const data = storage.getData();
      expect(data.transactions).toHaveLength(0);
      expect(data.goals).toHaveLength(0);
      expect(data.budgets).toHaveLength(0);
      expect(data.user).toBeNull();
    });
  });
});
