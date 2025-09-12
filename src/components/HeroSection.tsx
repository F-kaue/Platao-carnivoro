
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPersonagem from "@/assets/logo-personagem.png";

export function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-20 overflow-hidden min-h-[80vh] flex items-center">
      {/* Background with character (Logo 2) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `url(${logoPersonagem})`,
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        }}
      />
      
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="px-4 py-2 bg-brand-brown/10 text-primary text-sm font-augustus font-medium rounded-full inline-block mb-6 animate-fade-in">
            Curadoria refinada de ofertas exclusivas
          </span>
          
          <h1 className="text-4xl md:text-6xl font-diogenes font-bold mb-6 leading-tight animate-slide-up">
            Os melhores <span className="text-primary">achadinhos</span> com a sabedoria clássica
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 mx-auto max-w-2xl font-carnivoro animate-slide-up [animation-delay:100ms]">
            Encontre ofertas imperdíveis selecionadas com critério e economia. Uma curadoria sofisticada de produtos com os maiores descontos.
          </p>
          
          <Button 
            onClick={scrollToProducts}
            variant="carnivoro"
            size="lg" 
            className="animate-slide-up [animation-delay:200ms] shadow-lg"
          >
            Explorar Ofertas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
