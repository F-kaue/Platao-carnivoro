
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-lilac via-brand-gray-rose/30 to-brand-brown/20">
      
      {/* Background Character Image */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 dark:opacity-10"
        style={{
          backgroundImage: `url(${logoPersonagem})`,
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-diogenes font-bold leading-tight text-shadow-lg">
                <span className="block text-brand-dark dark:text-brand-lilac">Platão</span>
                <span className="block text-primary">Carnívoro</span>
              </h1>
              
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-augustus font-semibold text-brand-green-gray dark:text-brand-gray-rose">
                  Filosofia, Carne e Tradição
                </h2>
                
                <p className="text-lg md:text-xl font-body text-foreground/80 leading-relaxed max-w-xl">
                  Uma curadoria de produtos para quem valoriza <strong>força</strong>, <strong>disciplina</strong> e <strong>autenticidade</strong>. 
                  Descubra itens selecionados que refletem os valores clássicos em um mundo moderno.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToProducts}
                variant="carnivoro"
                size="lg" 
                className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Entrar na Revolução
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-primary/30 text-primary hover:bg-primary/10 font-augustus"
              >
                Conhecer Filosofia
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-foreground/60 font-body">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Curadoria Exclusiva</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Qualidade Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Valores Tradicionais</span>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Space */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-96 h-96 relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute inset-8 bg-gradient-to-tl from-brand-brown/30 to-transparent rounded-full blur-2xl"></div>
              
              {/* Badge/Seal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/90 backdrop-blur-sm border-2 border-primary/30 rounded-full w-64 h-64 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-diogenes font-bold text-primary mb-2">
                      CURADORIA
                    </div>
                    <div className="text-lg font-augustus text-foreground/80">
                      CARNÍVORA
                    </div>
                    <div className="w-16 h-0.5 bg-primary mx-auto mt-3"></div>
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
