import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FinanceProvider } from "./contexts/FinanceContext";
import { useAuth } from "./contexts/AuthContext";
import SakuBot from "./components/SakuBot";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import Budget from "./pages/Budget";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function Router() {
  const { isAuthenticated } = useAuth();

  const ProtectedRoute = ({ component: Component }: { component: React.ComponentType }) => {
    return isAuthenticated ? <Component /> : <Auth />;
  };

  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/login"} component={Auth} />
      <Route
        path={"/dashboard"}
        component={() => <ProtectedRoute component={Home} />}
      />
      <Route
        path={"/transactions"}
        component={() => <ProtectedRoute component={Transactions} />}
      />
      <Route
        path={"/goals"}
        component={() => <ProtectedRoute component={Goals} />}
      />
      <Route
        path={"/budget"}
        component={() => <ProtectedRoute component={Budget} />}
      />
      <Route
        path={"/analytics"}
        component={() => <ProtectedRoute component={Analytics} />}
      />
      <Route
        path={"/settings"}
        component={() => <ProtectedRoute component={Settings} />}
      />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <AuthProvider>
          <FinanceProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              <SakuBot />
            </TooltipProvider>
          </FinanceProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
