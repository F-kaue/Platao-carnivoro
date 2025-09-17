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
import { useSiteSettings, useContentBlocks, useNewsletterBenefits } from "@/hooks/useCMS";

// Mapeamento de ícones
const iconMap: { [key: string]: any } = {
  BookOpen,
  Target,
  Users,
  Crown,
  Shield,
  Heart,
  Star,
  Award,
  Zap,
  ExternalLink
};

export function DynamicNewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { subscribe, isLoading, error } = useBeehiiv();

  // Dados do CMS
  const { getSetting } = useSiteSettings('newsletter');
  const { getContent } = useContentBlocks('newsletter');
  const { benefits, loading: benefitsLoading } = useNewsletterBenefits();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const result = await subscribe(email);
      if (result.success) {
        setIsSubscribed(true);
        setEmail("");
      }
    } catch (error) {
      console.error('Erro ao inscrever:', error);
    }
  };

  // Fallback para dados estáticos caso o CMS não esteja carregado
  const newsletterTitle = getSetting('newsletter_title') || 'Mantenha suas Raízes';
  const newsletterSubtitle = getSetting('newsletter_subtitle') || 'Conecte-se com a sabedoria ancestral e mantenha-se atualizado com nossa jornada de despertar e transformação';
  const benefitsTitle = getContent('newsletter_benefits_title') || 'O que você receberá:';
  const benefitsSubtitle = getContent('newsletter_benefits_subtitle') || 'Conteúdo exclusivo que fortalece corpo, mente e espírito através da sabedoria clássica';

  // Fallback para benefícios estáticos
  const fallbackBenefits = [
    {
      id: '1',
      title: "Sabedoria Ancestral",
      description: "Conteúdo exclusivo sobre filosofia clássica e tradições",
      icon: "BookOpen",
      position: 1,
      is_active: true
    },
    {
      id: '2',
      title: "Curadoria Premium",
      description: "Primeiro acesso a produtos selecionados da Amazon",
      icon: "Target",
      position: 2,
      is_active: true
    },
    {
      id: '3',
      title: "Comunidade Exclusiva",
      description: "Conecte-se com pessoas que valorizam excelência",
      icon: "Users",
      position: 3,
      is_active: true
    },
    {
      id: '4',
      title: "Conteúdo VIP",
      description: "Reflexões profundas e insights únicos",
      icon: "Crown",
      position: 4,
      is_active: true
    }
  ];

  const displayBenefits = benefits.length > 0 ? benefits : fallbackBenefits;

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-brand-lilac/10 via-brand-gray-rose/5 to-brand-brown/15 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-brown/10 to-brand-green-gray/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-brand-gray-rose/10 to-brand-lilac/10 rounded-full blur-2xl"></div>
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
              {newsletterTitle.split(' ').map((word, index) => (
                <span key={index}>
                  {word === 'Raízes' ? (
                    <span className="text-brand-brown">{word}</span>
                  ) : (
                    word
                  )}
                  {index < newsletterTitle.split(' ').length - 1 && ' '}
                </span>
              ))}
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-augustus text-brand-green-gray/80 max-w-3xl mx-auto leading-relaxed px-2">
              {newsletterSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Left Side - Benefits */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-diogenes font-bold mb-3 sm:mb-4 text-foreground">
                  {benefitsTitle}
                </h3>
                <p className="text-sm sm:text-base text-brand-green-gray/70 font-body leading-relaxed">
                  {benefitsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {displayBenefits.map((benefit, index) => {
                  const IconComponent = iconMap[benefit.icon] || BookOpen;
                  
                  return (
                    <Card key={benefit.id || index} className="bg-background/80 backdrop-blur-sm border-brand-gray-rose/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <CardContent className="p-3 sm:p-4 md:p-6">
                        <div className="feature-box flex items-center gap-3 sm:gap-4">
                          <div className="feature-icon w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-lg flex items-center justify-center text-white flex-shrink-0">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                              <IconComponent className="w-full h-full" />
                            </div>
                          </div>
                          <div className="feature-content min-w-0 flex-1">
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
                  );
                })}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-brown" />
                  <span className="text-xs font-augustus text-brand-green-gray">100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-brand-brown" />
                  <span className="text-xs font-augustus text-brand-green-gray">Sem Spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-brand-brown" />
                  <span className="text-xs font-augustus text-brand-green-gray">Conteúdo Premium</span>
                </div>
              </div>
            </div>

            {/* Right Side - Newsletter Form */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Card className="bg-background/95 backdrop-blur-sm border-brand-gray-rose/30 shadow-2xl">
                  <CardContent className="p-6 sm:p-8">
                    {!isSubscribed ? (
                      <div>
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-diogenes font-bold mb-2 text-foreground">
                            Junte-se à Revolução
                          </h3>
                          <p className="text-sm sm:text-base text-brand-green-gray/70 font-body leading-relaxed">
                            Receba insights exclusivos, curadoria premium e reflexões que transformam sua vida
                          </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground font-augustus">
                              Seu melhor email
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="seu@email.com"
                              disabled={isLoading}
                              className="w-full bg-background/50 border-brand-gray-rose/30 text-foreground placeholder:text-brand-green-gray/50 focus-visible:ring-brand-brown"
                              required
                            />
                          </div>

                          {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                              <p className="text-sm text-red-600 font-body">
                                {error}
                              </p>
                            </div>
                          )}

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

                        <p className="text-xs text-brand-green-gray/60 font-body text-center mt-4">
                          Ao se inscrever, você concorda em receber conteúdo exclusivo do Platão Carnívoro.
                        </p>

                        <div className="mt-4 pt-4 border-t border-brand-gray-rose/20">
                          <div className="flex items-center justify-center gap-2 text-xs text-brand-green-gray/60">
                            <span className="font-augustus">POWERED BY BEEHIIV</span>
                            <ExternalLink className="w-3 h-3" />
                          </div>
                          <p className="text-xs text-brand-green-gray/50 text-center mt-1">
                            Newsletter profissional com analytics avançados
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
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-brown/10 to-brand-green-gray/10 rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-brand-gray-rose/30">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-brand-brown" />
              <span className="text-sm sm:text-base font-augustus font-bold text-brand-green-gray">
                MAIS DE 10.000 PESSOAS JÁ SE CONECTARAM COM SUAS RAÍZES
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
