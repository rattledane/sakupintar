import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  calculatePercentageChange,
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpense,
  calculateGoalProgress,
  groupTransactionsByCategory,
} from "@/lib/utils";

describe("Utility Functions", () => {
  describe("formatCurrency", () => {
    it("should format currency to IDR", () => {
      expect(formatCurrency(1000000)).toContain("1");
      expect(formatCurrency(0)).toContain("0");
      expect(formatCurrency(50000)).toContain("50");
    });

    it("should handle large numbers", () => {
      const result = formatCurrency(1000000000);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("calculatePercentageChange", () => {
    it("should calculate percentage change correctly", () => {
      expect(calculatePercentageChange(100, 50)).toBe(100);
      expect(calculatePercentageChange(50, 100)).toBe(-50);
      expect(calculatePercentageChange(100, 100)).toBe(0);
    });

    it("should handle zero previous value", () => {
      expect(calculatePercentageChange(100, 0)).toBe(0);
    });
  });

  describe("calculateTotalBalance", () => {
    it("should calculate total balance from transactions", () => {
      const transactions = [
        {
          id: "1",
          type: "income" as const,
          amount: 1000000,
          category: "Salary",
          description: "Salary",
          date: "2024-01-01",
        },
        {
          id: "2",
          type: "expense" as const,
          amount: 500000,
          category: "Food",
          description: "Lunch",
          date: "2024-01-01",
        },
      ];

      expect(calculateTotalBalance(transactions)).toBe(500000);
    });

    it("should handle empty transactions", () => {
      expect(calculateTotalBalance([])).toBe(0);
    });
  });

  describe("calculateTotalIncome", () => {
    it("should sum all income transactions", () => {
      const transactions = [
        {
          id: "1",
          type: "income" as const,
          amount: 1000000,
          category: "Salary",
          description: "Salary",
          date: "2024-01-01",
        },
        {
          id: "2",
          type: "income" as const,
          amount: 500000,
          category: "Bonus",
          description: "Bonus",
          date: "2024-01-01",
        },
        {
          id: "3",
          type: "expense" as const,
          amount: 200000,
          category: "Food",
          description: "Lunch",
          date: "2024-01-01",
        },
      ];

      expect(calculateTotalIncome(transactions)).toBe(1500000);
    });

    it("should return 0 for no income", () => {
      const transactions = [
        {
          id: "1",
          type: "expense" as const,
          amount: 500000,
          category: "Food",
          description: "Lunch",
          date: "2024-01-01",
        },
      ];

      expect(calculateTotalIncome(transactions)).toBe(0);
    });
  });

  describe("calculateTotalExpense", () => {
    it("should sum all expense transactions", () => {
      const transactions = [
        {
          id: "1",
          type: "expense" as const,
          amount: 500000,
          category: "Food",
          description: "Lunch",
          date: "2024-01-01",
        },
        {
          id: "2",
          type: "expense" as const,
          amount: 200000,
          category: "Transport",
          description: "Taxi",
          date: "2024-01-01",
        },
        {
          id: "3",
          type: "income" as const,
          amount: 1000000,
          category: "Salary",
          description: "Salary",
          date: "2024-01-01",
        },
      ];

      expect(calculateTotalExpense(transactions)).toBe(700000);
    });

    it("should return 0 for no expenses", () => {
      const transactions = [
        {
          id: "1",
          type: "income" as const,
          amount: 1000000,
          category: "Salary",
          description: "Salary",
          date: "2024-01-01",
        },
      ];

      expect(calculateTotalExpense(transactions)).toBe(0);
    });
  });

  describe("calculateGoalProgress", () => {
    it("should calculate goal progress percentage", () => {
      expect(calculateGoalProgress(5000000, 10000000)).toBe(50);
      expect(calculateGoalProgress(10000000, 10000000)).toBe(100);
      expect(calculateGoalProgress(0, 10000000)).toBe(0);
    });

    it("should handle zero target amount", () => {
      expect(calculateGoalProgress(5000000, 0)).toBe(0);
    });

    it("should handle over-target amounts", () => {
      expect(calculateGoalProgress(15000000, 10000000)).toBe(150);
    });
  });

  describe("groupTransactionsByCategory", () => {
    it("should group transactions by category", () => {
      const transactions = [
        {
          id: "1",
          type: "expense" as const,
          amount: 500000,
          category: "Food",
          description: "Lunch",
          date: "2024-01-01",
        },
        {
          id: "2",
          type: "expense" as const,
          amount: 300000,
          category: "Food",
          description: "Dinner",
          date: "2024-01-01",
        },
        {
          id: "3",
          type: "expense" as const,
          amount: 200000,
          category: "Transport",
          description: "Taxi",
          date: "2024-01-01",
        },
      ];

      const grouped = groupTransactionsByCategory(transactions);

      expect(grouped["Food"]).toBe(800000);
      expect(grouped["Transport"]).toBe(200000);
    });

    it("should handle empty transactions", () => {
      expect(groupTransactionsByCategory([])).toEqual({});
    });

    it("should sum amounts correctly for same category", () => {
      const transactions = [
        {
          id: "1",
          type: "expense" as const,
          amount: 100000,
          category: "Entertainment",
          description: "Movie",
          date: "2024-01-01",
        },
        {
          id: "2",
          type: "expense" as const,
          amount: 150000,
          category: "Entertainment",
          description: "Concert",
          date: "2024-01-02",
        },
        {
          id: "3",
          type: "expense" as const,
          amount: 200000,
          category: "Entertainment",
          description: "Gaming",
          date: "2024-01-03",
        },
      ];

      const grouped = groupTransactionsByCategory(transactions);
      expect(grouped["Entertainment"]).toBe(450000);
    });
  });
});
