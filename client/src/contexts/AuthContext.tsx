import React, { createContext, useContext, useState, useEffect } from "react";
import { storage, User } from "@/lib/storage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  updateProfile: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from storage
  useEffect(() => {
    storage.init();
    const storedUser = storage.getUser();
    const isAuth = storage.isAuthenticated();
    setUser(storedUser);
    setIsAuthenticated(isAuth);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - only demo@gmail.com / 123
    if (email === "demo@gmail.com" && password === "123") {
      const newUser: User = {
        id: "1",
        name: "Demo User",
        email: email,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
      };
      storage.setUser(newUser);
      storage.setAuthenticated(true);
      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    // For demo, we'll just allow signup with any credentials
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    storage.setUser(newUser);
    storage.setAuthenticated(true);
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    const data = storage.getData();
    data.user = null;
    data.isAuthenticated = false;
    storage.saveData(data);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedUser: User) => {
    storage.setUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, signup, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
