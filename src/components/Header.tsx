
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Produtos", href: "#produtos" },
    { label: "Filosofia", href: "#filosofia" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled 
          ? "bg-background/95 border-b border-brand-gray-rose/30 shadow-xl" 
          : "bg-gradient-to-r from-brand-lilac/20 via-background/90 to-brand-gray-rose/20"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="md" variant="text" className="scale-90 sm:scale-100" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-augustus font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-full transition-all hover:bg-accent/50 h-10 w-10 sm:h-11 sm:w-11"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            {/* Theme Toggle - Hidden on mobile */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full transition-all hover:bg-accent/50 h-10 w-10 sm:h-11 sm:w-11"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      {showSearch && (
        <div className="bg-background/95 border-b border-brand-gray-rose/30 p-3 sm:p-4 backdrop-blur-md animate-slide-down">
          <div className="container mx-auto flex items-center gap-2 sm:gap-3 max-w-md">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              className="flex-grow bg-card border-brand-gray-rose/30 focus-visible:ring-primary font-body h-9 sm:h-10 text-sm sm:text-base"
              autoFocus
            />
            <Button variant="carnivoro" size="sm" className="h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base">
              Buscar
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-background/95 border-b border-brand-gray-rose/30 backdrop-blur-md animate-slide-down">
          <nav className="container mx-auto p-3 sm:p-4 flex flex-col space-y-3 sm:space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors font-augustus font-medium py-2 text-base sm:text-lg"
                onClick={() => setShowMobileMenu(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 sm:pt-4 border-t border-brand-gray-rose/30">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
