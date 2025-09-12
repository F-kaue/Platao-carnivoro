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

  // Modificando o manipulador de eventos para resolver o problema no iOS
  const handleClick = () => {
    console.log("Botão clicado para o produto:", product.id);
    
    try {
      // Mostrar toast antes de qualquer operação assíncrona
      toast({
        title: "Redirecionando para oferta",
        description: "Você está sendo redirecionado para o site parceiro.",
        duration: 3000,
      });
      
      // Abrir link em uma nova janela imediatamente
      const newWindow = window.open('', '_blank');
      
      if (newWindow) {
        // Garantir que a janela esteja aberta antes de tentar registrar o clique
        trackClick(product.id)
          .then(() => {
            console.log("Clique registrado com sucesso");
            // Redirecionar a janela apenas após confirmação do registro
            newWindow.location.href = product.affiliateLink;
          })
          .catch((error) => {
            console.error("Erro ao processar clique:", error);
            // Em caso de erro, ainda permite o redirecionamento
            newWindow.location.href = product.affiliateLink;
          });
      } else {
        // Se não conseguiu abrir a janela (bloqueio de popup), tenta abrir diretamente
        console.warn("Não foi possível abrir uma nova janela. Tentando método alternativo.");
        trackClick(product.id).catch(console.error); // Registra o clique de qualquer forma
        window.open(product.affiliateLink, '_blank');
      }
    } catch (error) {
      console.error("Erro ao processar clique:", error);
      // Fallback para método direto em caso de erro
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
        "overflow-hidden transition-all duration-300 hover:shadow-xl group h-full flex flex-col border-brand-gray-rose/30 hover:border-primary/50 bg-card/80 backdrop-blur-sm",
        className
      )}
    >
      {/* Product Image Carousel */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-lilac/20 to-brand-gray-rose/10">
        {/* Loading Indicator */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40 z-10">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}
        
        {/* Image */}
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className={cn(
            "object-cover w-full h-full transition-all duration-500 group-hover:scale-110",
            isImageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
          )}
          onLoad={() => setIsImageLoading(false)}
        />
        
        {/* Discount Badge - More elegant */}
        {discountPercentage > 0 && (
          <Badge 
            className="absolute top-3 right-3 bg-primary/90 text-white font-augustus font-medium border-none shadow-lg"
          >
            -{discountPercentage}%
          </Badge>
        )}
        
        {/* Marketplace Badge - More refined */}
        <Badge 
          className={cn(
            "absolute top-3 left-3 text-white font-augustus font-medium border-none shadow-lg backdrop-blur-sm",
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
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/90 hover:bg-background border border-brand-gray-rose/30 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
              <span className="sr-only">Imagem anterior</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/90 hover:bg-background border border-brand-gray-rose/30 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
              <span className="sr-only">Próxima imagem</span>
            </Button>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {product.images.map((_, index) => (
                <div 
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all shadow-sm",
                    index === currentImageIndex 
                      ? "bg-primary w-4" 
                      : "bg-background/70 border border-brand-gray-rose/30"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Product Details */}
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="font-augustus font-semibold line-clamp-2 h-12 text-foreground leading-tight">
            {product.title}
          </h3>
          
          <div className="mt-4 space-y-2">
            {/* Original Price (crossed out) */}
            <p className="text-sm text-muted-foreground line-through font-body">
              De {formatPrice(product.originalPrice)}
            </p>
            
            {/* Sale Price */}
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-primary font-augustus">
                {formatPrice(product.salePrice)}
              </p>
              <span className="text-xs text-muted-foreground font-body">
                à vista
              </span>
            </div>
            
            {/* Economy Badge */}
            <div className="text-sm text-brand-green-gray font-body">
              Economia de {formatPrice(product.originalPrice - product.salePrice)}
            </div>
          </div>
        </div>
        
        {/* Affiliate Link Button */}
        <Button 
          onClick={handleClick}
          type="button"
          variant="carnivoro"
          className="mt-6 w-full shadow-md hover:shadow-lg transition-all duration-300 font-augustus font-semibold"
        >
          Obter Oferta
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
