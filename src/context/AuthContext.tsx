
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (cpf: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAndRefreshAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simple function to check localStorage authentication
  const checkAndRefreshAuth = async (): Promise<boolean> => {
    try {
      // Only check localStorage for authentication status
      const localAuth = localStorage.getItem("isLoggedIn") === "true";
      console.log("Estado de autenticação local:", localAuth ? "Logado" : "Não logado");
      
      setIsLoggedIn(localAuth);
      return localAuth;
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      return false;
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    checkAndRefreshAuth();
  }, []);

  // Local authentication only
  const login = async (cpf: string, password: string): Promise<boolean> => {
    // Basic credential validation
    if (cpf === "07710027342" && password === "0956kaue") {
      try {
        console.log("Credenciais corretas, configurando autenticação local");
        
        // Set local login state
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel de administração.",
        });
        return true;
      } catch (error: any) {
        console.error("Erro durante processo de login:", error);
        toast({
          title: "Erro de autenticação",
          description: "Ocorreu um erro durante o processo de login.",
          variant: "destructive",
        });
        return false;
      }
    } else {
      toast({
        title: "Erro de autenticação",
        description: "CPF ou senha incorretos.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Local logout function
  const logout = () => {
    try {
      // Update local state
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      
      navigate("/login");
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar desconectar.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkAndRefreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
