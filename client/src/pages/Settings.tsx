import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Trash2, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const { refreshData } = useFinance();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    if (!formData.name || !formData.email) {
      toast.error("Semua field harus diisi");
      return;
    }

    updateProfile({
      id: user?.id || "",
      name: formData.name,
      email: formData.email,
      avatar: user?.avatar,
    });

    toast.success("Profil berhasil diperbarui");
    setIsEditing(false);
  };

  const handleClearAllData = () => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      localStorage.clear();
      toast.success("Semua data berhasil dihapus");
      window.location.href = "/";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Kelola pengaturan akun dan preferensi Anda</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
              alt={user?.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                    });
                  }}
                  variant="outline"
                  className="border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-3">
                Change your password to keep your account secure.
              </p>
              <Button
                disabled
                variant="outline"
                className="border-gray-300 text-gray-500 cursor-not-allowed"
              >
                Change Password
              </Button>
              <p className="text-xs text-gray-500 mt-2">Coming soon</p>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Currency</p>
                <p className="text-xs text-gray-600">Indonesian Rupiah (IDR)</p>
              </div>
              <span className="text-sm font-bold text-gray-900">IDR</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Language</p>
                <p className="text-xs text-gray-600">Indonesian</p>
              </div>
              <span className="text-sm font-bold text-gray-900">ID</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Theme</p>
                <p className="text-xs text-gray-600">Light Mode</p>
              </div>
              <span className="text-sm font-bold text-gray-900">Light</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Help & Support
          </h3>

          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Need help? Here are some resources:
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  → How to add transactions
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  → Understanding your budget
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  → Setting financial goals
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  → Contact support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl p-6 shadow-sm border border-red-200">
          <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h3>

          <p className="text-sm text-red-700 mb-4">
            Permanently delete all your data. This action cannot be undone.
          </p>

          <Button
            onClick={handleClearAllData}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete All Data
          </Button>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">About SakuPintar</h3>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Version:</strong> 1.0.0
            </p>
            <p>
              <strong>Last Updated:</strong> November 2024
            </p>
            <p className="text-gray-600">
              SakuPintar is a personal finance management application designed to help you
              manage your income, expenses, and achieve your financial goals.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
