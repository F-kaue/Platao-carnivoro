
import { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useProducts } from "@/context/ProductContext";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { trackClick } = useProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  // Format prices
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Handle image carousel navigation
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
    setIsImageLoading(true);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setIsImageLoading(true);
  };

  // Handle affiliate link click
  const handleClick = async () => {
    try {
      // Registro do clique
      await trackClick(product.id);
      
      // Notificar o usuário
      toast({
        title: "Redirecionando para oferta",
        description: "Você está sendo redirecionado para o site parceiro.",
        duration: 3000,
      });
      
      // Abrir o link de afiliado
      window.open(product.affiliateLink, '_blank');
    } catch (error) {
      console.error("Erro ao processar clique:", error);
      // Ainda abre o link mesmo em caso de erro
      window.open(product.affiliateLink, '_blank');
    }
  };

  // Get marketplace badge color
  const getMarketplaceColor = () => {
    switch(product.marketplace) {
      case 'Amazon': return 'bg-amber-500';
      case 'Shopee': return 'bg-orange-500';
      case 'Mercado Livre': return 'bg-yellow-500';
      case 'AliExpress': return 'bg-red-500';
      case 'Magalu': return 'bg-blue-500';
      case 'Americanas': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md group h-full flex flex-col",
        className
      )}
    >
      {/* Product Image Carousel */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* Loading Indicator */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 z-10">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
        )}
        
        {/* Image */}
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className={cn(
            "object-cover w-full h-full transition-all duration-500",
            isImageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
          )}
          onLoad={() => setIsImageLoading(false)}
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge 
            className="absolute top-2 right-2 bg-purple-500 text-white font-medium"
          >
            -{discountPercentage}%
          </Badge>
        )}
        
        {/* Marketplace Badge */}
        <Badge 
          className={cn(
            "absolute top-2 left-2 text-white font-medium",
            getMarketplaceColor()
          )}
        >
          {product.marketplace}
        </Badge>
        
        {/* Carousel Controls (only show if more than one image) */}
        {product.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white dark:bg-black/60 dark:hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Imagem anterior</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white dark:bg-black/60 dark:hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próxima imagem</span>
            </Button>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {product.images.map((_, index) => (
                <div 
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    index === currentImageIndex 
                      ? "bg-purple-500 w-3" 
                      : "bg

-white/70 dark:bg-white/40"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Product Details */}
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="font-medium line-clamp-2 h-12">{product.title}</h3>
          
          <div className="mt-2 space-y-1">
            {/* Original Price (crossed out) */}
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </p>
            
            {/* Sale Price */}
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {formatPrice(product.salePrice)}
            </p>
          </div>
        </div>
        
        {/* Affiliate Link Button */}
        <Button 
          onClick={handleClick}
          className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white"
        >
          Ver Oferta
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
