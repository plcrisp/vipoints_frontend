import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../features/auth/services/AuthService";
import UserService from "../features/auth/services/UserService";
import type { User } from "../features/auth/types/User";

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    const { token } = await AuthService.login(email, password);
    AuthService.saveToken(token);
    const userId = await UserService.getUserIdFromToken();
    let userData = null;
    if(userId) userData = await UserService.getUserById(userId)
    console.log(userData)
    setUser(userData);
    navigate("/dashboard");
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    navigate("/");
  };

  const loadUser = async () => {
    const userId = await UserService.getUserIdFromToken();
    if (!userId) return;

    try {
      let userData = null;
      if(userId) userData = await UserService.getUserById(userId)
      setUser(userData);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);