
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
      className="rounded-full w-10 h-10 transition-all duration-300 hover:bg-accent/50"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-foreground/80" />
      ) : (
        <Sun className="h-5 w-5 text-foreground/80" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
