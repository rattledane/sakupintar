import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpense,
  formatCurrency,
  groupTransactionsByCategory,
} from "@/lib/utils";
import { TrendingUp, Calculator } from "lucide-react";

export default function Analytics() {
  const { transactions, budgets } = useFinance();
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcData, setCalcData] = useState({
    targetAmount: "",
    monthlyIncome: "",
    monthlyBonus: "",
    monthlyTax: "",
  });

  const totalBalance = calculateTotalBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const categoryExpenses = groupTransactionsByCategory(
    transactions.filter((t) => t.type === "expense")
  );

  const handleCalcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalcData({
      ...calcData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateGoalTime = () => {
    const target = parseInt(calcData.targetAmount) || 0;
    const income = parseInt(calcData.monthlyIncome) || 0;
    const bonus = parseInt(calcData.monthlyBonus) || 0;
    const tax = parseInt(calcData.monthlyTax) || 0;

    const monthlyNet = income + bonus - tax;
    if (monthlyNet <= 0) {
      return { months: Infinity, years: Infinity };
    }

    const months = Math.ceil(target / monthlyNet);
    const years = (months / 12).toFixed(2);

    return { months, years: parseFloat(years) };
  };

  const goalTime = calculateGoalTime();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Analisis mendalam tentang keuangan Anda</p>
          </div>
          <Button
            onClick={() => setShowCalculator(!showCalculator)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Financial Calculator
          </Button>
        </div>

        {/* Financial Calculator */}
        {showCalculator && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Goal Achievement Calculator</h3>
            <p className="text-gray-600 text-sm mb-4">
              Calculate how long it will take to reach your financial goal based on your income and expenses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Amount (IDR)
                </label>
                <Input
                  type="number"
                  name="targetAmount"
                  placeholder="50000000"
                  value={calcData.targetAmount}
                  onChange={handleCalcChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (IDR)
                </label>
                <Input
                  type="number"
                  name="monthlyIncome"
                  placeholder="5000000"
                  value={calcData.monthlyIncome}
                  onChange={handleCalcChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Bonus (IDR)
                </label>
                <Input
                  type="number"
                  name="monthlyBonus"
                  placeholder="0"
                  value={calcData.monthlyBonus}
                  onChange={handleCalcChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Tax (IDR)
                </label>
                <Input
                  type="number"
                  name="monthlyTax"
                  placeholder="0"
                  value={calcData.monthlyTax}
                  onChange={handleCalcChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            {calcData.targetAmount && calcData.monthlyIncome && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Result</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Time to Reach Goal</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {goalTime.years === Infinity ? "∞" : goalTime.years}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Months Required</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {goalTime.months === Infinity ? "∞" : goalTime.months}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">months</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalBalance)}</p>
            <p className="text-xs text-gray-500 mt-2">Current balance</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
            <p className="text-xs text-gray-500 mt-2">All time</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Expense</h3>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
            <p className="text-xs text-gray-500 mt-2">All time</p>
          </div>
        </div>

        {/* Expense by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Expense by Category</h3>
            <div className="space-y-4">
              {Object.entries(categoryExpenses).length > 0 ? (
                Object.entries(categoryExpenses)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, amount]) => {
                    const percentage = (amount / totalExpense) * 100;
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-700">{category}</p>
                          <p className="text-sm font-bold text-gray-900">{formatCurrency(amount)}</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total</p>
                      </div>
                    );
                  })
              ) : (
                <p className="text-gray-500 text-center py-8">No expense data yet</p>
              )}
            </div>
          </div>

          {/* Budget vs Expense */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Budget vs Expense</h3>
            <div className="space-y-4">
              {budgets.length > 0 ? (
                budgets.map((budget) => {
                  const percentage = (budget.spent / budget.amount) * 100;
                  const isOverBudget = budget.spent > budget.amount;
                  return (
                    <div key={budget.id}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">{budget.category}</p>
                        <p className={`text-sm font-bold ${isOverBudget ? "text-red-600" : "text-gray-900"}`}>
                          {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            isOverBudget ? "bg-red-500" : "bg-gradient-to-r from-purple-600 to-blue-600"
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-8">No budget data yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Average Transaction</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(
                  transactions.length > 0
                    ? (totalIncome + totalExpense) / transactions.length
                    : 0
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Income to Expense Ratio</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalExpense > 0 ? (totalIncome / totalExpense).toFixed(2) : "0"}:1
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Savings Rate</p>
              <p className="text-3xl font-bold text-green-600">
                {totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : "0"}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
