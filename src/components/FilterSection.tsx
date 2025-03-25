
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Category, Marketplace } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterSection() {
  const { filterByCategory, filterByMarketplace, resetFilters } = useProducts();
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeMarketplace, setActiveMarketplace] = useState<Marketplace | null>(null);

  const categories: Category[] = [
    'Eletrônicos', 
    'Casa e Decoração', 
    'Moda', 
    'Beleza', 
    'Cozinha', 
    'Brinquedos', 
    'Esportes', 
    'Livros', 
    'Pets', 
    'Outros'
  ];
  
  const marketplaces: Marketplace[] = [
    'Amazon', 
    'Shopee', 
    'Mercado Livre', 
    'AliExpress', 
    'Magalu', 
    'Americanas', 
    'Outros'
  ];

  // Handle category filter
  const handleCategoryFilter = (category: Category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      filterByCategory(null);
    } else {
      setActiveCategory(category);
      filterByCategory(category);
    }
  };

  // Handle marketplace filter
  const handleMarketplaceFilter = (marketplace: Marketplace) => {
    if (activeMarketplace === marketplace) {
      setActiveMarketplace(null);
      filterByMarketplace(null);
    } else {
      setActiveMarketplace(marketplace);
      filterByMarketplace(marketplace);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory(null);
    setActiveMarketplace(null);
    resetFilters();
  };

  // Check if any filter is active
  const isFilterActive = activeCategory !== null || activeMarketplace !== null;

  return (
    <div className="w-full py-4 overflow-hidden animate-fade-in">
      <div className="flex flex-col gap-4">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium mb-2">Categorias:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => handleCategoryFilter(category)}
                className={cn(
                  "rounded-full border border-purple-200 dark:border-purple-900/50 transition-all",
                  activeCategory === category 
                    ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-400 dark:border-purple-600"
                    : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Marketplaces */}
        <div>
          <h3 className="text-sm font-medium mb-2">Lojas:</h3>
          <div className="flex flex-wrap gap-2">
            {marketplaces.map((marketplace) => (
              <Button
                key={marketplace}
                variant="outline"
                size="sm"
                onClick={() => handleMarketplaceFilter(marketplace)}
                className={cn(
                  "rounded-full border border-purple-200 dark:border-purple-900/50 transition-all",
                  activeMarketplace === marketplace 
                    ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-400 dark:border-purple-600"
                    : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
                )}
              >
                {marketplace}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Reset Button - Only show if filters are active */}
        {isFilterActive && (
          <div className="flex justify-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
