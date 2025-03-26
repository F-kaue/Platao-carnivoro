
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
        try {
          // Check if we already have a session
          const { data: sessionData } = await supabase.auth.getSession();
          
          if (!sessionData.session) {
            // If no session exists, sign in with Supabase
            const { error } = await supabase.auth.signInWithPassword({
              email: "achadinhos@admin.com",
              password: "0956kaue",
            });
            
            if (error) {
              console.error("Error signing in with Supabase:", error);
              // Still set as logged in since localStorage is our primary auth mechanism
            }
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
      try {
        // Sign in with Supabase first to ensure we have a session
        const { error } = await supabase.auth.signInWithPassword({
          email: "achadinhos@admin.com",
          password: "0956kaue",
        });
        
        if (error) {
          console.error("Error signing in with Supabase:", error);
          toast({
            title: "Erro de autenticação",
            description: "Não foi possível autenticar com o Supabase: " + error.message,
            variant: "destructive",
          });
          return false;
        }
        
        // Set logged in state and store in localStorage
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel de administração.",
        });
        return true;
      } catch (error: any) {
        console.error("Error during login process:", error);
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

  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Update local state
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      
      navigate("/login");
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar desconectar.",
        variant: "destructive",
      });
    }
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
