
import { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, TrendingUp, Award, Star } from "lucide-react";

export function PopularProducts() {
  const { products, isLoading } = useProducts();
  const [curatedProducts, setCuratedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      // Sort products by clicks (descending) and take top 6 for better display
      // Only show products that have at least 1 click to ensure quality
      const sorted = [...products]
        .filter(product => product.clicks > 0)
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
      <div className="text-center mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="bg-gradient-to-r from-brand-brown/15 to-brand-green-gray/15 rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-3 sm:py-4 border border-brand-gray-rose/30 shadow-lg">
            <Badge className="bg-gradient-to-r from-brand-brown to-brand-green-gray text-white border-none font-augustus px-4 sm:px-6 py-2 text-sm sm:text-base font-bold">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              PRODUTOS EM ALTA
            </Badge>
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-green-gray to-brand-brown rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-diogenes font-bold mb-4 sm:mb-6 text-foreground">
          Curadoria <span className="text-brand-brown">Validada</span>
        </h2>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto font-body leading-relaxed px-4 sm:px-0">
          Os produtos mais populares da nossa curadoria, validados pela comunidade que busca <strong>excelência</strong> e <strong>autenticidade</strong>
        </p>
        
      </div>
      
      <div className="relative">        
        {/* Products grid with premium styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {curatedProducts.map((product, index) => (
            <div key={product.id} className={`group relative ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              {/* Premium Quality Badge for first 3 items */}
              {index < 3 && (
                <div className="absolute -top-4 -right-4 z-10">
                  <div className={`px-4 py-2 rounded-2xl shadow-xl flex items-center ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                    'bg-gradient-to-r from-orange-500 to-orange-600'
                  }`}>
                    {index === 0 ? <Crown className="w-4 h-4 mr-2 text-white" /> : 
                     index === 1 ? <Award className="w-4 h-4 mr-2 text-white" /> : 
                     <Star className="w-4 h-4 mr-2 text-white" />}
                    <span className="font-augustus font-bold text-sm text-white">
                      TOP {index + 1}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Enhanced Product Card */}
              <div className={`backdrop-blur-md rounded-3xl border p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.03] ${
                index === 0 
                  ? 'bg-gradient-to-br from-yellow-50/20 to-yellow-100/10 border-yellow-300/50 group-hover:border-yellow-400/70 group-hover:bg-gradient-to-br group-hover:from-yellow-50/30 group-hover:to-yellow-100/20' 
                  : 'bg-gradient-to-br from-background/95 to-brand-lilac/5 border-brand-gray-rose/30 group-hover:border-brand-brown/50 group-hover:bg-gradient-to-br group-hover:from-background/98 group-hover:to-brand-brown/10'
              }`}>
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
