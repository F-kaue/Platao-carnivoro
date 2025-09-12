
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
    <div className="w-full py-6 overflow-hidden animate-fade-in">
      <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-brand-gray-rose/30 p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-augustus font-semibold mb-3 text-foreground/80 tracking-wide uppercase">
              Categorias de Produtos
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                  className={cn(
                    "rounded-full border transition-all font-body text-sm hover:scale-105",
                    activeCategory === category 
                      ? "bg-primary text-white border-primary shadow-md"
                      : "border-brand-gray-rose/40 hover:bg-primary/10 hover:border-primary/50"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Marketplaces */}
          <div>
            <h3 className="text-sm font-augustus font-semibold mb-3 text-foreground/80 tracking-wide uppercase">
              Plataformas Parceiras
            </h3>
            <div className="flex flex-wrap gap-2">
              {marketplaces.map((marketplace) => (
                <Button
                  key={marketplace}
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarketplaceFilter(marketplace)}
                  className={cn(
                    "rounded-full border transition-all font-body text-sm hover:scale-105",
                    activeMarketplace === marketplace 
                      ? "bg-secondary text-white border-secondary shadow-md"
                      : "border-brand-gray-rose/40 hover:bg-secondary/10 hover:border-secondary/50"
                  )}
                >
                  {marketplace}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Reset Button - Only show if filters are active */}
          {isFilterActive && (
            <div className="flex justify-center pt-2 border-t border-brand-gray-rose/30">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-muted-foreground hover:text-primary font-augustus font-medium transition-all"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar Seleção
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
