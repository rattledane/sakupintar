import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency to IDR
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Parse currency string to number
export const parseCurrency = (value: string): number => {
  return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
};

// Format date
export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

// Format date for input
export const formatDateForInput = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Calculate percentage change
export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Get month name
export const getMonthName = (monthIndex: number): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthIndex] || "";
};

// Get last N months
export const getLastNMonths = (n: number): string[] => {
  const months = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(getMonthName(date.getMonth()));
  }
  return months;
};

// Get month data for transactions
export const getMonthlyData = (
  transactions: any[],
  type: "income" | "expense"
): number[] => {
  const months = getLastNMonths(7);
  const data = new Array(7).fill(0);

  transactions.forEach((transaction) => {
    if (transaction.type === type) {
      const date = new Date(transaction.date);
      const monthIndex = months.findIndex(
        (m) => m === getMonthName(date.getMonth())
      );
      if (monthIndex !== -1) {
        data[monthIndex] += transaction.amount;
      }
    }
  });

  return data;
};

// Calculate total balance
export const calculateTotalBalance = (transactions: any[]): number => {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === "income") {
      return total + transaction.amount;
    } else {
      return total - transaction.amount;
    }
  }, 0);
};

// Calculate total income
export const calculateTotalIncome = (transactions: any[]): number => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + t.amount, 0);
};

// Calculate total expense
export const calculateTotalExpense = (transactions: any[]): number => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + t.amount, 0);
};

// Calculate total savings
export const calculateTotalSavings = (goals: any[]): number => {
  return goals.reduce((total, goal) => total + goal.currentAmount, 0);
};

// Get transactions for current month
export const getCurrentMonthTransactions = (transactions: any[]): any[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
};

// Get recent transactions (last N)
export const getRecentTransactions = (transactions: any[], limit = 5): any[] => {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Group transactions by category
export const groupTransactionsByCategory = (
  transactions: any[]
): Record<string, number> => {
  const grouped: Record<string, number> = {};

  transactions.forEach((t) => {
    if (!grouped[t.category]) {
      grouped[t.category] = 0;
    }
    grouped[t.category] += t.amount;
  });

  return grouped;
};

// Calculate goal progress percentage
export const calculateGoalProgress = (
  currentAmount: number,
  targetAmount: number
): number => {
  if (targetAmount === 0) return 0;
  return (currentAmount / targetAmount) * 100;
};
