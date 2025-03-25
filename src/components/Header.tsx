
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X, Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Category, Marketplace } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { filterByCategory, searchProducts, resetFilters } = useProducts();
  const [searchValue, setSearchValue] = useState("");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(searchValue);
    setShowSearch(false);
  };

  // Handle category selection
  const handleCategoryClick = (category: Category) => {
    filterByCategory(category);
    setShowMobileMenu(false);
  };

  // Reset filters
  const handleResetFilters = () => {
    resetFilters();
    setSearchValue("");
  };

  const categories: Category[] = [
    'Eletrônicos', 
    'Casa e Decoração', 
    'Moda', 
    'Beleza', 
    'Cozinha', 
    'Esportes', 
    'Livros', 
    'Outros'
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0" onClick={handleResetFilters}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="text-sm text-foreground/80 hover:text-purple-500 transition-colors"
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full transition-all hover:bg-purple-100 dark:hover:bg-purple-400/10"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-5 w-5 text-foreground/80" />
            <span className="sr-only">Pesquisar</span>
          </Button>

          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full transition-all hover:bg-purple-100 dark:hover:bg-purple-400/10"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <X className="h-5 w-5 text-foreground/80" />
            ) : (
              <Menu className="h-5 w-5 text-foreground/80" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Search Panel */}
      {showSearch && (
        <div className="bg-white dark:bg-gray-900 p-4 border-b shadow-sm animate-slide-down">
          <form 
            onSubmit={handleSearch}
            className="container mx-auto flex items-center gap-2"
          >
            <Input
              type="text"
              placeholder="Pesquisar produtos..."
              className="flex-grow"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4 border-b shadow-sm animate-slide-down">
          <nav className="flex flex-col space-y-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="text-left px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/10 rounded-md transition-colors"
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
