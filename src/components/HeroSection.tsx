
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Background decorations */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-200/30 dark:bg-purple-800/10 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-3/4 left-3/4 w-96 h-96 rounded-full bg-purple-300/20 dark:bg-purple-600/10 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full inline-block mb-4 animate-fade-in">
            Descubra produtos incríveis com ótimos preços
          </span>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight animate-slide-up">
            Os melhores <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">achadinhos</span> da internet em um só lugar
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 mx-auto max-w-2xl animate-slide-up [animation-delay:100ms]">
            Encontre ofertas imperdíveis e economize em suas compras. Curadoria de produtos com os maiores descontos da internet.
          </p>
          
          <Button 
            onClick={scrollToProducts}
            size="lg" 
            className="bg-purple-500 hover:bg-purple-600 text-white animate-slide-up [animation-delay:200ms]"
          >
            Ver ofertas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
