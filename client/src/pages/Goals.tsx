import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { formatCurrency, calculateGoalProgress } from "@/lib/utils";
import { toast } from "sonner";

const goalColors = [
  { name: "Purple", value: "bg-purple-500" },
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Orange", value: "bg-orange-500" },
];

export default function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [savingsAmount, setSavingsAmount] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
    category: "",
    color: goalColors[0].value,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.targetAmount || !formData.deadline) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (editingId) {
      updateGoal(editingId, {
        name: formData.name,
        targetAmount: parseInt(formData.targetAmount),
        currentAmount: parseInt(formData.currentAmount),
        deadline: formData.deadline,
        category: formData.category,
        color: formData.color,
      });
      toast.success("Goal berhasil diperbarui");
      setEditingId(null);
    } else {
      addGoal({
        name: formData.name,
        targetAmount: parseInt(formData.targetAmount),
        currentAmount: parseInt(formData.currentAmount),
        deadline: formData.deadline,
        category: formData.category,
        color: formData.color,
      });
      toast.success("Goal berhasil ditambahkan");
    }

    setFormData({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: "",
      category: "",
      color: goalColors[0].value,
    });
    setShowForm(false);
  };

  const handleEdit = (goal: any) => {
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline,
      category: goal.category,
      color: goal.color || goalColors[0].value,
    });
    setEditingId(goal.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus goal ini?")) {
      deleteGoal(id);
      toast.success("Goal berhasil dihapus");
    }
  };

  const handleAddSavings = (goalId: string) => {
    if (!savingsAmount || parseInt(savingsAmount) <= 0) {
      toast.error("Masukkan jumlah yang valid");
      return;
    }

    const goal = goals.find((g) => g.id === goalId);
    if (goal) {
      const newAmount = Math.min(
        goal.currentAmount + parseInt(savingsAmount),
        goal.targetAmount
      );
      updateGoal(goalId, { currentAmount: newAmount });
      toast.success("Savings berhasil ditambahkan");
      setSavingsAmount("");
      setSelectedGoalId(null);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: "",
      category: "",
      color: goalColors[0].value,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
            <p className="text-gray-600 mt-1">Tetapkan dan kelola tujuan finansial Anda</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Goal
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Goal" : "Add New Goal"}
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
                    Goal Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="e.g., MacBook Pro"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Amount (IDR)
                  </label>
                  <Input
                    type="number"
                    name="targetAmount"
                    placeholder="0"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Amount (IDR)
                  </label>
                  <Input
                    type="number"
                    name="currentAmount"
                    placeholder="0"
                    value={formData.currentAmount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <Input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Input
                    type="text"
                    name="category"
                    placeholder="e.g., Electronics"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    {goalColors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {editingId ? "Update" : "Add"} Goal
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.length > 0 ? (
            goals.map((goal) => {
              const progress = calculateGoalProgress(goal.currentAmount, goal.targetAmount);
              return (
                <div
                  key={goal.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{goal.name}</h3>
                      <p className="text-sm text-gray-500">{goal.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(goal)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(goal.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">Progress</p>
                      <p className="text-sm font-bold text-gray-900">{progress.toFixed(1)}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${goal.color || "bg-purple-600"} h-2 rounded-full transition-all`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Current</p>
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(goal.currentAmount)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Target</p>
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(goal.targetAmount)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Remaining</p>
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(Math.max(0, goal.targetAmount - goal.currentAmount))}
                      </p>
                    </div>
                  </div>

                  {selectedGoalId === goal.id ? (
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={savingsAmount}
                        onChange={(e) => setSavingsAmount(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      <Button
                        onClick={() => handleAddSavings(goal.id)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        Add
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedGoalId(null);
                          setSavingsAmount("");
                        }}
                        variant="outline"
                        className="border-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setSelectedGoalId(goal.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      Add Savings
                    </Button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-white rounded-xl p-12 text-center">
              <p className="text-gray-500 mb-4">No goals yet. Create one to get started!</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Create First Goal
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
