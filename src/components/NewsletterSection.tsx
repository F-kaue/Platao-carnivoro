import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Shield, 
  Users, 
  BookOpen, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  Target,
  Award,
  Crown,
  ExternalLink
} from "lucide-react";
import { useBeehiiv } from "@/hooks/useBeehiiv";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { subscribe, isLoading, error } = useBeehiiv();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Usar o hook do Beehiiv para inscrição via API
      const result = await subscribe(email, 'api');
      
      if (result.success) {
        // Mostra mensagem de sucesso por 3 segundos
        setIsSubscribed(true);
        setTimeout(() => {
          setIsSubscribed(false);
          setEmail(''); // Limpa o campo
        }, 3000);
      }
      
    } catch (error) {
      console.error('Erro ao inscrever:', error);
    }
  };

  const benefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Sabedoria Ancestral",
      description: "Conteúdo exclusivo sobre filosofia clássica e tradições"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Curadoria Premium",
      description: "Primeiro acesso a produtos selecionados da Amazon"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Comunidade Exclusiva",
      description: "Conecte-se com pessoas que valorizam excelência"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Conteúdo VIP",
      description: "Reflexões profundas e insights únicos"
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-brand-lilac/10 via-brand-gray-rose/5 to-brand-brown/15 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-brown/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-green-gray/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-lilac/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-brown/10 to-brand-green-gray/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 border border-brand-gray-rose/30">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-brand-brown" />
              <span className="text-xs sm:text-sm font-augustus font-semibold text-brand-green-gray">
                CONEXÃO ANCESTRAL
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-diogenes font-bold mb-4 sm:mb-6 text-foreground leading-tight">
              Mantenha suas <span className="text-brand-brown">Raízes</span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-augustus text-brand-green-gray/80 max-w-3xl mx-auto leading-relaxed px-2">
              Conecte-se com a sabedoria ancestral e mantenha-se atualizado com nossa jornada de 
              <strong className="text-brand-brown"> despertar</strong> e <strong className="text-brand-brown">transformação</strong>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Left Side - Benefits */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-diogenes font-bold mb-3 sm:mb-4 text-foreground">
                  O que você receberá:
                </h3>
                <p className="text-sm sm:text-base text-brand-green-gray/70 font-body leading-relaxed">
                  Conteúdo exclusivo que fortalece corpo, mente e espírito através da sabedoria clássica
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="bg-background/80 backdrop-blur-sm border-brand-gray-rose/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-3 sm:p-4 md:p-6">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-lg flex items-center justify-center text-white flex-shrink-0">
                          <div className="w-4 h-4 sm:w-6 sm:h-6">
                            {benefit.icon}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-augustus font-bold text-xs sm:text-sm md:text-base text-foreground mb-1 leading-tight">
                            {benefit.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-brand-green-gray/70 font-body leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-brown" />
                  <span className="text-sm font-augustus text-brand-green-gray">100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-brand-brown" />
                  <span className="text-sm font-augustus text-brand-green-gray">Sem Spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-brown" />
                  <span className="text-sm font-augustus text-brand-green-gray">Conteúdo Premium</span>
                </div>
              </div>
            </div>

            {/* Right Side - Newsletter Form */}
            <div className="relative order-1 lg:order-2">
              <Card className="bg-gradient-to-br from-background/95 to-brand-lilac/5 border-brand-gray-rose/30 shadow-2xl">
                <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
                  {!isSubscribed ? (
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-diogenes font-bold mb-3 sm:mb-4 text-foreground">
                        Junte-se à Revolução
                      </h3>
                      
                      <p className="text-sm sm:text-base text-brand-green-gray/70 font-body mb-4 sm:mb-6 leading-relaxed">
                        Receba insights exclusivos, curadoria premium e reflexões que transformam sua vida
                      </p>

                      <form onSubmit={handleSubscribe} className="space-y-3 sm:space-y-4">
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Seu melhor email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-card border-brand-gray-rose/30 focus-visible:ring-primary font-body h-10 sm:h-12 text-sm sm:text-base pl-3 sm:pl-4 pr-10 sm:pr-12"
                            required
                          />
                          <Mail className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-brand-green-gray/50" />
                        </div>
                        
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white py-2.5 sm:py-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-augustus font-bold text-sm sm:text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Conectando...
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                              <span className="hidden sm:inline">Conectar com as Raízes</span>
                              <span className="sm:hidden">Conectar</span>
                              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </>
                          )}
                        </Button>
                      </form>

                      <p className="text-xs text-brand-green-gray/60 font-body mt-3 sm:mt-4 px-2">
                        Ao se inscrever, você concorda em receber conteúdo exclusivo do Platão Carnívoro
                      </p>

                      {/* Beehiiv Integration Info */}
                      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-brand-brown/5 to-brand-green-gray/5 rounded-xl border border-brand-gray-rose/20">
                        <div className="flex items-center gap-2 mb-2">
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-brand-brown" />
                          <span className="text-xs sm:text-sm font-augustus font-semibold text-brand-green-gray">
                            Powered by Beehiiv
                          </span>
                        </div>
                        <p className="text-xs text-brand-green-gray/70 font-body">
                          Newsletter profissional com analytics avançados e design premium
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-diogenes font-bold mb-4 text-foreground">
                        Inscrição Realizada com Sucesso!
                      </h3>

                      <p className="text-brand-green-gray/70 font-body mb-6 leading-relaxed">
                        Você foi inscrito com sucesso no newsletter do Platão Carnívoro! Em breve receberá um email de confirmação e conteúdo exclusivo diretamente no seu email.
                      </p>

                      <div className="flex items-center justify-center gap-2 text-brand-brown">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-augustus font-bold">Bem-vindo à revolução!</span>
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Floating Elements - Hidden on mobile */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-brand-brown to-brand-green-gray rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-brown/10 to-brand-green-gray/10 rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-brand-gray-rose/30">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-brand-brown" />
              <span className="text-xs sm:text-sm font-augustus font-semibold text-brand-green-gray">
                <span className="hidden sm:inline">Mais de 10.000 pessoas já se conectaram com suas raízes</span>
                <span className="sm:hidden">+10.000 pessoas conectadas</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
