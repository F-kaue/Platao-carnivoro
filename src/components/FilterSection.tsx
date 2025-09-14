
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterSection() {
  const { filterByCategory, resetFilters, products } = useProducts();
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);

  // Get unique categories from products
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
    setAvailableCategories(uniqueCategories.sort());
  }, [products]);

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

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory(null);
    resetFilters();
  };

  // Check if any filter is active
  const isFilterActive = activeCategory !== null;

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
              {availableCategories.map((category) => (
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
          
          {/* Amazon Partnership */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4 border border-orange-200/50 dark:border-orange-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-augustus font-semibold text-orange-800 dark:text-orange-200 tracking-wide uppercase">
                  Parceria Exclusiva
                </h3>
                <p className="text-xs text-orange-700 dark:text-orange-300 font-body">
                  Produtos selecionados da Amazon
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-orange-200 dark:bg-orange-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full w-3/4"></div>
              </div>
              <span className="text-xs font-augustus font-medium text-orange-700 dark:text-orange-300">
                Qualidade Garantida
              </span>
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
