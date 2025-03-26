
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (cpf: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = localStorage.getItem("isLoggedIn");
      
      if (authStatus === "true") {
        // Also sign in with Supabase using the anonymous key
        try {
          // Check if we already have a session
          const { data: sessionData } = await supabase.auth.getSession();
          
          if (!sessionData.session) {
            // If no session exists, sign in anonymously
            await supabase.auth.signInWithPassword({
              email: "achadinhos@admin.com",
              password: "0956kaue",
            });
          }
          
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error syncing Supabase auth:", error);
          // Still set as logged in since localStorage is our primary auth mechanism
          setIsLoggedIn(true);
        }
      }
    };
    
    checkAuth();
  }, []);

  const login = async (cpf: string, password: string): Promise<boolean> => {
    // In a real implementation, this would be an API call
    // For now, we'll hard-code the credentials as specified
    if (cpf === "07710027342" && password === "0956kaue") {
      // Also sign in with Supabase using the anonymous key
      try {
        await supabase.auth.signInWithPassword({
          email: "achadinhos@admin.com",
          password: "0956kaue",
        });
      } catch (error) {
        console.error("Error signing in with Supabase:", error);
        // We'll continue anyway since this is just for database access
      }
      
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel de administração.",
      });
      return true;
    } else {
      toast({
        title: "Erro de autenticação",
        description: "CPF ou senha incorretos.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    // Also sign out from Supabase
    supabase.auth.signOut().catch((error) => {
      console.error("Error signing out from Supabase:", error);
    });
    
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
