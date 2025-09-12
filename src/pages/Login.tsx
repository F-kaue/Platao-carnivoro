
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to admin dashboard
  if (isLoggedIn) {
    navigate("/admin");
    return null;
  }

  // Format CPF while typing (XXX.XXX.XXX-XX)
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    
    if (value.length <= 11) {
      // Format with dots and dash
      if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d+)/, "$1.$2");
      }
      
      setCpf(value);
    }
  };

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Clean CPF before submission (remove formatting)
      const cleanCpf = cpf.replace(/\D/g, "");
      
      const success = await login(cleanCpf, password);
      if (success) {
        navigate("/admin");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-dark">
      {/* Theme Toggle (Top Right) */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* Home Link (Top Left) */}
      <div className="absolute top-4 left-4">
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size="sm" variant="text" className="text-brand-lilac" />
        </a>
      </div>
      
      {/* Centered Logo */}
      <div className="mb-8">
        <Logo size="lg" variant="image" />
      </div>
      
      {/* Login Card */}
      <Card className="w-full max-w-md bg-brand-green-gray/50 border-brand-gray-rose/30 animate-scale-in">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-augustus text-brand-lilac">
            Painel Administrativo
          </CardTitle>
          <CardDescription className="text-brand-gray-rose">
            Faça login para acessar o painel administrativo
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cpf" className="text-sm font-medium text-brand-lilac font-augustus">
                CPF
              </label>
              <Input
                id="cpf"
                type="text"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="xxx.xxx.xxx-xx"
                disabled={isLoading}
                className="bg-brand-lilac/10 border-brand-gray-rose/30 text-brand-lilac placeholder:text-brand-gray-rose/70 focus-visible:ring-brand-brown"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-brand-lilac font-augustus">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="bg-brand-lilac/10 border-brand-gray-rose/30 text-brand-lilac placeholder:text-brand-gray-rose/70 focus-visible:ring-brand-brown pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-brand-gray-rose hover:text-brand-lilac hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Esconder senha" : "Mostrar senha"}
                  </span>
                </Button>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-brown hover:bg-brand-gray-rose text-white font-augustus transition-colors mt-6"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center">
                  <LockKeyhole className="mr-2 h-4 w-4" />
                  Entrar
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
