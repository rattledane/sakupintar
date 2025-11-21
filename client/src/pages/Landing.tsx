import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Wallet, TrendingUp, Target, PieChart } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SakuPintar</h1>
          </div>
          <Button
            onClick={() => setLocation("/login")}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Kelola Keuangan Anda dengan <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Cerdas</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              SakuPintar membantu Anda mengelola pendapatan, pengeluaran, dan mencapai tujuan finansial dengan mudah dan efisien.
            </p>
            <Button
              onClick={() => setLocation("/login")}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-20">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pantau Keuangan</h3>
              <p className="text-gray-600">
                Lihat ringkasan lengkap pendapatan, pengeluaran, dan saldo Anda secara real-time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tetapkan Tujuan</h3>
              <p className="text-gray-600">
                Buat dan kelola tujuan finansial Anda dengan pelacakan kemajuan yang detail.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analisis Detail</h3>
              <p className="text-gray-600">
                Dapatkan wawasan mendalam tentang pola pengeluaran dan tren keuangan Anda.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kelola Budget</h3>
              <p className="text-gray-600">
                Atur anggaran untuk setiap kategori dan pantau pengeluaran Anda.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Siap Mengelola Keuangan Anda?</h3>
            <p className="text-lg mb-8 opacity-90">
              Daftar sekarang dan mulai perjalanan menuju kebebasan finansial Anda.
            </p>
            <Button
              onClick={() => setLocation("/login")}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-lg font-semibold"
            >
              Mulai Sekarang
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-100 bg-white/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 SakuPintar. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
