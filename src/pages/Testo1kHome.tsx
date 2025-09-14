import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Target,
  Star,
  Award
} from "lucide-react";

const Testo1kHome = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-lilac/20 via-brand-gray-rose/10 to-brand-brown/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="/testo1k/bgtesto-1k.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <img 
                src="/testo1k/testo1k-logo.png" 
                alt="Testosterona 1k" 
                className="h-20 w-auto"
              />
            </div>

            <h1 className="text-6xl md:text-8xl font-diogenes font-bold leading-tight text-shadow-lg mb-8">
              <span className="block text-brand-dark dark:text-brand-lilac">TESTOSTERONA</span>
              <span className="block text-brand-brown">1K</span>
            </h1>

            <div className="space-y-6 mb-12">
              <h2 className="text-2xl md:text-3xl font-augustus font-semibold text-brand-green-gray dark:text-brand-gray-rose">
                Transforme sua energia, força e vitalidade
              </h2>
              <p className="text-xl md:text-2xl font-body text-foreground/80 leading-relaxed max-w-3xl mx-auto">
                Descubra como aumentar naturalmente seus níveis de testosterona através de estratégias comprovadas e um plano diário simples.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-16">
              <Link to="/testo1k/landing">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white px-12 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-augustus font-bold text-xl"
                >
                  Descobrir o Método Completo
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>

            {/* Product Preview */}
            <div className="relative">
              <img 
                src="/testo1k/ebook_mock-867x1024.png" 
                alt="Testosterona 1k - Ebook" 
                className="w-full max-w-sm mx-auto drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-diogenes font-bold mb-6 text-foreground">
              O que você vai <span className="text-brand-brown">aprender</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-brand-lilac/10 to-brand-gray-rose/10 border-brand-gray-rose/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-augustus font-bold mb-4 text-foreground">
                  Alimentação Otimizada
                </h3>
                <p className="text-brand-green-gray/70 font-body leading-relaxed">
                  Estratégias nutricionais específicas para aumentar naturalmente seus níveis de testosterona
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand-lilac/10 to-brand-gray-rose/10 border-brand-gray-rose/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-augustus font-bold mb-4 text-foreground">
                  Treinos Eficazes
                </h3>
                <p className="text-brand-green-gray/70 font-body leading-relaxed">
                  Exercícios e hábitos comprovados para estimular a produção hormonal
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand-lilac/10 to-brand-gray-rose/10 border-brand-gray-rose/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-augustus font-bold mb-4 text-foreground">
                  Resultados Garantidos
                </h3>
                <p className="text-brand-green-gray/70 font-body leading-relaxed">
                  Plano diário simples e comprovado para elevar sua energia e vitalidade
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/testo1k/landing">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-augustus font-bold text-lg"
              >
                <Award className="w-5 h-5 mr-2" />
                Ver Oferta Completa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-brand-lilac/20 via-brand-gray-rose/10 to-brand-brown/20 border-t border-brand-gray-rose/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/testo1k/testo1k-logo.png" 
                alt="Testosterona 1k" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-diogenes font-bold text-foreground">
                Testosterona 1k
              </span>
            </div>
            
            <p className="text-sm text-brand-green-gray/60 font-body">
              © 2024 Testosterona 1k. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Testo1kHome;
