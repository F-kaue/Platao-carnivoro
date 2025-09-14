
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPersonagem from "@/assets/logo-personagem.png";

export function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("produtos");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-lilac/20 sm:from-brand-lilac/40 via-brand-gray-rose/10 sm:via-brand-gray-rose/20 to-brand-brown/15 sm:to-brand-brown/30 pt-20 sm:pt-20 lg:pt-24">
      
      {/* Background Character Image */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 opacity-15 sm:opacity-15 dark:opacity-8 sm:dark:opacity-10"
        style={{
          backgroundImage: `url(${logoPersonagem})`,
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-diogenes font-bold leading-tight text-shadow-lg">
                <span className="block text-brand-dark dark:text-brand-lilac">PLATÃO</span>
                <span className="block text-brand-brown">CARNÍVORO</span>
              </h1>
              
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-augustus font-semibold text-brand-green-gray dark:text-brand-gray-rose">
                  Filosofia, Carne e Tradição
                </h2>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-body text-foreground/80 leading-relaxed max-w-xl">
                  Uma curadoria exclusiva de produtos da <strong>Amazon</strong> para quem valoriza <strong>força</strong>, <strong>disciplina</strong> e <strong>autenticidade</strong>. 
                  Descubra itens selecionados que refletem os valores clássicos em um mundo moderno.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                onClick={scrollToProducts}
                variant="carnivoro"
                size="lg" 
                className="text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Entrar na Revolução
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-foreground/60 font-body">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Curadoria Exclusiva</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Qualidade Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span>Valores Tradicionais</span>
              </div>
            </div>
          </div>

          {/* Mobile Visual Element - Overlay Badge */}
          <div className="lg:hidden flex items-center justify-center mt-6">
            <div className="w-56 h-56 relative">
              {/* Badge/Seal with stronger background for visibility over image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-background/95 backdrop-blur-md border-2 border-brand-brown/50 rounded-full w-44 h-44 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-xl font-diogenes font-bold text-brand-brown mb-1">
                      CURADORIA
                    </div>
                    <div className="text-xs font-augustus text-brand-green-gray">
                      CARNÍVORA
                    </div>
                    <div className="w-14 h-0.5 bg-brand-brown mx-auto mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Right Side - Visual Space */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-96 h-96 relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute inset-8 bg-gradient-to-tl from-brand-brown/30 to-transparent rounded-full blur-2xl"></div>
              
              {/* Badge/Seal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/95 backdrop-blur-md border-2 border-brand-brown/40 rounded-full w-72 h-72 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-4xl font-diogenes font-bold text-brand-brown mb-3">
                      CURADORIA
                    </div>
                    <div className="text-xl font-augustus text-brand-green-gray">
                      CARNÍVORA
                    </div>
                    <div className="w-20 h-0.5 bg-brand-brown mx-auto mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
