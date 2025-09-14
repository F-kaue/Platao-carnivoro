import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Star, 
  Shield, 
  Clock, 
  Zap, 
  TrendingUp,
  ArrowRight,
  Play,
  Award,
  Target,
  Heart
} from "lucide-react";

const Testo1k = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Alimentação Otimizada",
      description: "Estratégias nutricionais específicas para aumentar naturalmente seus níveis de testosterona"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Treinos Eficazes",
      description: "Exercícios e hábitos comprovados para estimular a produção hormonal"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Rotina Diária Simples",
      description: "Plano prático e comprovado para seguir no seu dia a dia"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Energia e Vitalidade",
      description: "Aumente sua energia, força e vitalidade de forma natural e sustentável"
    }
  ];

  const testimonials = [
    {
      image: "/testo1k/depoimento01.png",
      name: "Depoimento 1"
    },
    {
      image: "/testo1k/depoimento02.png", 
      name: "Depoimento 2"
    },
    {
      image: "/testo1k/depoimento03.png",
      name: "Depoimento 3"
    },
    {
      image: "/testo1k/depoimento04.png",
      name: "Depoimento 4"
    },
    {
      image: "/testo1k/depoimento05.png",
      name: "Depoimento 5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Floating CTA Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <a 
          href="https://chk.eduzz.com/Z0BBQ1360A?a=35814376" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-augustus font-bold text-sm sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Garantir Agora</span>
            <span className="sm:hidden">Garantir</span>
          </Button>
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-lilac/20 via-brand-gray-rose/10 to-brand-brown/20 pt-20 sm:pt-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="/testo1k/bgtesto-1k.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 sm:px-6 py-8 sm:py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              {/* Logo */}
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-1 sm:mb-2 lg:mb-3">
                <img 
                  src="/testo1k/testo1k-logo.png" 
                  alt="Testosterona 1k" 
                  className="h-6 sm:h-8 lg:h-10 w-auto"
                />
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-diogenes font-bold leading-none sm:leading-tight text-shadow-lg text-center lg:text-left">
                <span className="block text-brand-dark dark:text-brand-lilac">TESTOSTERONA</span>
                <span className="block text-brand-brown">1K</span>
              </h1>

              <div className="space-y-1 sm:space-y-2 text-center lg:text-left">
                <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-augustus font-semibold text-brand-green-gray dark:text-brand-gray-rose">
                  Eleve seus níveis de testosterona de forma 100% natural
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-body text-foreground/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Transforme sua <strong>energia</strong>, <strong>força</strong> e <strong>vitalidade</strong> através de estratégias comprovadas e passos simples.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <a 
                  href="https://chk.eduzz.com/Z0BBQ1360A?a=35814376" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white px-2 sm:px-6 lg:px-8 py-1.5 sm:py-3 lg:py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-augustus font-bold text-xs sm:text-sm lg:text-base w-full sm:w-auto"
                  >
                    Quero aumentar minha testosterona agora
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-2 lg:gap-3 pt-1 sm:pt-2">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-brand-brown" />
                  <span className="text-xs font-augustus text-brand-green-gray">100% Natural</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-brand-brown" />
                  <span className="text-xs font-augustus text-brand-green-gray">Método Comprovado</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-brand-brown" />
                  <span className="text-xs font-augustus text-brand-green-gray">Garantia Total</span>
                </div>
              </div>
            </div>

            {/* Right Side - Product Visual */}
            <div className="relative flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative z-10 max-w-xs sm:max-w-sm lg:max-w-md">
                <img 
                  src="/testo1k/ebook_mock-867x1024.png" 
                  alt="Testosterona 1k - Ebook" 
                  className="w-full h-auto drop-shadow-2xl animate-float"
                />
              </div>
              
              {/* Floating Elements - Hidden on mobile for cleaner look */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-brand-brown to-brand-green-gray rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-brand-green-gray to-brand-brown rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Product Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-diogenes font-bold mb-6 sm:mb-8 text-foreground">
              Sobre o <span className="text-brand-brown">Produto</span>
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg font-body text-foreground/80 leading-relaxed">
              <p>
                O <strong>Testosterona 1k</strong> foi elaborado para fornecer tudo o que você precisa saber sobre como aumentar naturalmente seus níveis de testosterona. Através de estratégias comprovadas e passos simples, você aprenderá a otimizar sua alimentação, rotina de exercícios e hábitos diários para elevar sua energia, força e vitalidade.
              </p>
              
              <p>
                Você encontrará orientações detalhadas sobre cada aspecto necessário para maximizar seus níveis hormonais e, mais importante, um plano diário para seguir. Com dedicação e consistência, os resultados que você busca estão ao seu alcance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-brand-lilac/10 via-brand-gray-rose/5 to-brand-brown/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-diogenes font-bold mb-4 sm:mb-6 text-foreground">
              Benefícios <span className="text-brand-brown">Principais</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto font-body">
              Descubra como transformar sua vida através de estratégias naturais e comprovadas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-background/95 backdrop-blur-sm border-brand-gray-rose/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-augustus font-bold mb-3 sm:mb-4 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-brand-green-gray/70 font-body leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-diogenes font-bold mb-6 text-foreground">
              O que nossos <span className="text-brand-brown">clientes</span> dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-brand-lilac/10 to-brand-gray-rose/10 border-brand-gray-rose/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-4">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="bg-gradient-to-r from-brand-brown to-brand-green-gray text-white px-3 py-1 rounded-full shadow-lg">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-augustus font-bold text-sm">5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-brown/10 via-brand-green-gray/5 to-brand-lilac/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-diogenes font-bold mb-4 sm:mb-6 text-foreground">
                Oferta <span className="text-brand-brown">Especial</span>
              </h2>
              
              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-brand-brown/20 to-brand-green-gray/20 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-brand-gray-rose/30">
                <p className="text-base sm:text-lg font-augustus font-semibold text-brand-green-gray mb-3 sm:mb-4">
                  ⏰ Oferta válida por tempo limitado!
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-diogenes font-bold text-brand-brown">{timeLeft.hours}</div>
                    <div className="text-xs sm:text-sm font-augustus text-brand-green-gray">Horas</div>
                  </div>
                  <div className="text-xl sm:text-2xl text-brand-brown">:</div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-diogenes font-bold text-brand-brown">{timeLeft.minutes}</div>
                    <div className="text-xs sm:text-sm font-augustus text-brand-green-gray">Min</div>
                  </div>
                  <div className="text-xl sm:text-2xl text-brand-brown">:</div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-diogenes font-bold text-brand-brown">{timeLeft.seconds}</div>
                    <div className="text-xs sm:text-sm font-augustus text-brand-green-gray">Seg</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-background/95 to-brand-lilac/5 border-brand-gray-rose/30 shadow-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <img 
                      src="/testo1k/testo1k-logo.png" 
                      alt="Testosterona 1k" 
                      className="h-12 w-auto"
                    />
                    <h3 className="text-3xl font-diogenes font-bold text-foreground">
                      Testosterona 1k
                    </h3>
                  </div>

                  <div className="space-y-4 mb-8">
                    <p className="text-lg font-augustus text-brand-green-gray">Por apenas</p>
                    <div className="text-4xl font-diogenes font-bold text-brand-brown">
                      11x de R$ 5,35
                    </div>
                    <p className="text-xl font-augustus text-brand-green-gray">
                      ou R$ 49,70 à vista
                    </p>
                  </div>

                  <a 
                    href="https://chk.eduzz.com/Z0BBQ1360A?a=35814376" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg"
                      className="w-full bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-augustus font-bold text-xl"
                    >
                      <Zap className="w-6 h-6 mr-3" />
                      Quero garantir agora
                    </Button>
                  </a>

                  <div className="flex items-center justify-center gap-4 mt-6">
                    <Shield className="w-5 h-5 text-brand-brown" />
                    <span className="text-sm font-augustus text-brand-green-gray">
                      Compra 100% segura | Acesso imediato após pagamento
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            
            <div className="flex items-center justify-center gap-8 text-sm text-brand-green-gray/70 font-body">
              <a href="#" className="hover:text-brand-brown transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-brand-brown transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-brand-brown transition-colors">Contato</a>
            </div>
            
            <p className="mt-6 text-sm text-brand-green-gray/60 font-body">
              © 2024 Testosterona 1k. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Testo1k;
