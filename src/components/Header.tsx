
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
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
    { label: "Comunidade", href: "#comunidade" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled 
          ? "bg-background/95 border-b border-brand-gray-rose/30 shadow-lg" 
          : "bg-background/80"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="md" variant="image" />
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
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-full transition-all hover:bg-accent/50"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full transition-all hover:bg-accent/50 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
              <span className="sr-only">Carrinho</span>
            </Button>

            {/* User/Login Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full transition-all hover:bg-accent/50"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Minha Conta</span>
            </Button>

            {/* Theme Toggle - Hidden on mobile */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full transition-all hover:bg-accent/50"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      {showSearch && (
        <div className="bg-background/95 border-b border-brand-gray-rose/30 p-4 backdrop-blur-md animate-slide-down">
          <div className="container mx-auto flex items-center gap-3 max-w-md">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              className="flex-grow bg-card border-brand-gray-rose/30 focus-visible:ring-primary font-body"
              autoFocus
            />
            <Button variant="carnivoro" size="sm">
              Buscar
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-background/95 border-b border-brand-gray-rose/30 backdrop-blur-md animate-slide-down">
          <nav className="container mx-auto p-4 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors font-augustus font-medium py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-brand-gray-rose/30">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
