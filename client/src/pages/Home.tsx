import DashboardLayout from "@/components/DashboardLayout";
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import {
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpense,
  calculateTotalSavings,
  calculatePercentageChange,
  getRecentTransactions,
  getMonthlyData,
  formatCurrency,
  getLastNMonths,
} from "@/lib/utils";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { transactions, goals, budgets } = useFinance();
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const totalBalance = calculateTotalBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const totalSavings = calculateTotalSavings(goals);
  const recentTransactions = getRecentTransactions(transactions, 5);
  const incomeData = getMonthlyData(transactions, "income");
  const expenseData = getMonthlyData(transactions, "expense");
  const months = getLastNMonths(7);

  const lastMonthIncome = incomeData[incomeData.length - 2] || 0;
  const lastMonthExpense = expenseData[expenseData.length - 2] || 0;
  const incomeChange = calculatePercentageChange(
    incomeData[incomeData.length - 1],
    lastMonthIncome
  );
  const expenseChange = calculatePercentageChange(
    expenseData[expenseData.length - 1],
    lastMonthExpense
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Kelola keuangan Anda dengan mudah</p>
          </div>
          <Button
            onClick={() => setShowAddTransaction(!showAddTransaction)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Transaction
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Total Balance</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(totalBalance)}
            </p>
            <p className="text-xs text-green-600">+12.1% vs last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Income</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(totalIncome)}
            </p>
            <p className={`text-xs ${incomeChange >= 0 ? "text-green-600" : "text-red-600"}`}>
              {incomeChange >= 0 ? "+" : ""}{incomeChange.toFixed(2)}% vs last month
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Expense</h3>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(totalExpense)}
            </p>
            <p className={`text-xs ${expenseChange <= 0 ? "text-green-600" : "text-red-600"}`}>
              {expenseChange <= 0 ? "" : "+"}{expenseChange.toFixed(2)}% vs last month
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 text-sm font-medium">Total Savings</h3>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(totalSavings)}
            </p>
            <p className="text-xs text-blue-600">+12.1% vs last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Money Flow</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>Chart will be rendered here</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Budget</h3>
            <div className="space-y-4">
              {budgets.slice(0, 3).map((budget) => (
                <div key={budget.id}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">{budget.category}</p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min((budget.spent / budget.amount) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
            <Button variant="ghost" className="text-purple-600 hover:bg-purple-50">
              See all
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {new Date(transaction.date).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{transaction.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{transaction.category}</td>
                      <td className={`py-3 px-4 text-sm font-medium text-right ${
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No transactions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
