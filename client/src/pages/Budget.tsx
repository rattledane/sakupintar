import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const defaultCategories = [
  "Cafe & Restaurants",
  "Entertainment",
  "Shopping",
  "Food & Groceries",
  "Health & Beauty",
  "Traveling",
  "Subscription",
  "Others",
];

export default function Budget() {
  const { budgets, addBudget, updateBudget, deleteBudget, transactions } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.amount) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (editingId) {
      updateBudget(editingId, {
        category: formData.category,
        amount: parseInt(formData.amount),
      });
      toast.success("Budget berhasil diperbarui");
      setEditingId(null);
    } else {
      const spent = transactions
        .filter((t) => t.type === "expense" && t.category === formData.category)
        .reduce((sum, t) => sum + t.amount, 0);

      addBudget({
        category: formData.category,
        amount: parseInt(formData.amount),
        spent: spent,
      });
      toast.success("Budget berhasil ditambahkan");
    }

    setFormData({
      category: "",
      amount: "",
    });
    setShowForm(false);
  };

  const handleEdit = (budget: any) => {
    setFormData({
      category: budget.category,
      amount: budget.amount.toString(),
    });
    setEditingId(budget.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus budget ini?")) {
      deleteBudget(id);
      toast.success("Budget berhasil dihapus");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      category: "",
      amount: "",
    });
  };

  const getSpentAmount = (category: string): number => {
    return transactions
      .filter((t) => t.type === "expense" && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

    const updateSpentAmounts = () => {
    budgets.forEach((budget) => {
      const spent = getSpentAmount(budget.category);
      if (spent !== budget.spent) {
        updateBudget(budget.id, { spent });
      }
    });
  };

  // Update spent amounts when component mounts or transactions change
  useEffect(() => {
    updateSpentAmounts();
  }, [transactions]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget</h1>
            <p className="text-gray-600 mt-1">Kelola anggaran dan pantau pengeluaran Anda</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Budget
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Budget" : "Add New Budget"}
              </h3>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="">Select category</option>
                    {defaultCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Amount (IDR)
                  </label>
                  <Input
                    type="number"
                    name="amount"
                    placeholder="0"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {editingId ? "Update" : "Add"} Budget
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.length > 0 ? (
            budgets.map((budget) => {
              const percentage = (budget.spent / budget.amount) * 100;
              const isOverBudget = budget.spent > budget.amount;
              return (
                <div
                  key={budget.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{budget.category}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(budget)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(budget.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">Spent</p>
                      <p className={`text-sm font-bold ${isOverBudget ? "text-red-600" : "text-gray-900"}`}>
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isOverBudget ? "bg-red-500" : "bg-gradient-to-r from-purple-600 to-blue-600"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {isOverBudget ? "Over budget" : "Remaining"}
                    </p>
                    <p className={`text-sm font-bold ${isOverBudget ? "text-red-600" : "text-green-600"}`}>
                      {isOverBudget
                        ? "-" + formatCurrency(budget.spent - budget.amount)
                        : formatCurrency(budget.amount - budget.spent)}
                    </p>
                  </div>

                  {isOverBudget && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-xs text-red-700 font-medium">
                        You have exceeded your budget by {formatCurrency(budget.spent - budget.amount)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-white rounded-xl p-12 text-center">
              <p className="text-gray-500 mb-4">No budgets yet. Create one to get started!</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Create First Budget
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
