
import { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame } from "lucide-react";

export function PopularProducts() {
  const { products, isLoading } = useProducts();
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      // Sort products by clicks (descending) and take top 4
      const sorted = [...products]
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 4);
      setPopularProducts(sorted);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-square rounded-md" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-full mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (popularProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Produtos Populares</h2>
        <Badge className="bg-amber-500 text-white">
          <Flame className="w-4 h-4 mr-1" />
          Mais Procurados
        </Badge>
      </div>
      
      <div className="relative">
        {/* Popular tag with gradient background */}
        <div className="absolute -top-3 -left-3 z-10">
          <div className="bg-gradient-to-r from-amber-500 to-red-500 text-white px-4 py-1 rounded-full shadow-lg flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="font-bold">Top 4</span>
          </div>
        </div>
        
        {/* Products grid with special styling for popular items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 rounded-xl shadow-sm border border-amber-100 dark:border-amber-900/30">
          {popularProducts.map((product, index) => (
            <div key={product.id} className="relative transform transition-all duration-300 hover:scale-105">
              {/* Position indicator */}
              <div className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <ProductCard product={product} className="border-2 border-amber-200 dark:border-amber-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
