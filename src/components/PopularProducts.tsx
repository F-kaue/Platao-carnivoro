
import { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles } from "lucide-react";

export function PopularProducts() {
  const { products, isLoading } = useProducts();
  const [curatedProducts, setCuratedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      // Sort products by clicks (descending) and take top 6 for better display
      const sorted = [...products]
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 6);
      setCuratedProducts(sorted);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 p-6 bg-card rounded-xl border">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full mt-3" />
          </div>
        ))}
      </div>
    );
  }

  if (curatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Crown className="w-6 h-6 text-primary" />
          <Badge className="bg-primary/10 text-primary border-primary/20 font-augustus px-4 py-1">
            <Sparkles className="w-4 h-4 mr-1" />
            Seleção Premium
          </Badge>
          <Crown className="w-6 h-6 text-primary" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-diogenes font-bold mb-3 text-foreground">
          Curadoria <span className="text-primary">de Elite</span>
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto font-body">
          Produtos cuidadosamente selecionados que exemplificam os valores de excelência e autenticidade
        </p>
      </div>
      
      <div className="relative">        
        {/* Products grid with premium styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {curatedProducts.map((product, index) => (
            <div key={product.id} className="group relative">
              {/* Premium Quality Badge for first 3 items */}
              {index < 3 && (
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-to-r from-primary to-brand-brown text-white px-3 py-1 rounded-full shadow-lg flex items-center">
                    <Crown className="w-3 h-3 mr-1" />
                    <span className="font-augustus font-semibold text-xs">
                      {index === 0 ? 'Destaque' : index === 1 ? 'Premium' : 'Seleto'}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Enhanced Product Card */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-brand-gray-rose/30 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/50">
                <ProductCard 
                  product={product} 
                  className="border-none shadow-none bg-transparent" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
