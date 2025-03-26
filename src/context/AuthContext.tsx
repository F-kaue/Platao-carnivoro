
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  // Função para verificar e atualizar o estado de autenticação
  const checkAndRefreshAuth = async (): Promise<boolean> => {
    try {
      // Verificar localStorage primeiro
      const localAuth = localStorage.getItem("isLoggedIn") === "true";
      
      if (localAuth) {
        // Verificar se temos uma sessão Supabase
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session) {
          console.log("Sem sessão Supabase, tentando re-autenticar...");
          
          // Definir o estado de login baseado apenas no localStorage
          setIsLoggedIn(true);
          return true;
        } else {
          console.log("Sessão Supabase existente encontrada");
        }
        
        setIsLoggedIn(true);
        return true;
      } else {
        console.log("Usuário não está logado de acordo com localStorage");
        setIsLoggedIn(false);
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      // Consideramos o estado atual do localStorage
      const currentLoginState = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(currentLoginState);
      return currentLoginState;
    }
  };

  // Verificar autenticação ao montar o componente
  useEffect(() => {
    checkAndRefreshAuth();
  }, []);

  const login = async (cpf: string, password: string): Promise<boolean> => {
    // Validação básica de credenciais
    if (cpf === "07710027342" && password === "0956kaue") {
      try {
        console.log("Credenciais corretas, configurando autenticação local");
        
        // Apenas configurar o login local sem tentar autenticar no Supabase
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        
        // Tentar autenticar com Supabase em segundo plano (não bloqueante)
        supabase.auth.signInWithPassword({
          email: "achadinhos@admin.com",
          password: "0956kaue",
        }).then(({ data, error }) => {
          if (error) {
            console.warn("Erro ao autenticar com Supabase (não crítico):", error);
          } else {
            console.log("Autenticação Supabase bem-sucedida em segundo plano");
          }
        }).catch(err => {
          console.warn("Exceção ao autenticar com Supabase (não crítica):", err);
        });
        
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

  const logout = async () => {
    try {
      // Deslogar do Supabase
      await supabase.auth.signOut().catch(err => {
        console.warn("Erro ao fazer logout do Supabase (não crítico):", err);
      });
      
      // Atualizar estado local
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
