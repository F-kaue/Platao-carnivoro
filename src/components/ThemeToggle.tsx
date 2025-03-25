
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-400/10"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-purple-600" />
      ) : (
        <Sun className="h-5 w-5 text-purple-400" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
