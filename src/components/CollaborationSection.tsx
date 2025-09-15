import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, 
  Star, 
  Award, 
  ArrowRight,
  Users,
  Target,
  Zap
} from "lucide-react";

export function CollaborationSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Banner */}
      <div className="absolute inset-0 z-0">
        <div className="hidden sm:block">
          <img 
            src="/testo1k/banner1.png" 
            alt="Collaboration Banner" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="block sm:hidden">
          <img 
            src="/testo1k/bannermobile.png" 
            alt="Collaboration Banner Mobile" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-lilac/20 via-brand-gray-rose/10 to-brand-brown/20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Banner Section */}
          <div className="mb-12 sm:mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Desktop Banner */}
              <div className="hidden sm:block relative">
                <img 
                  src="/testo1k/banner2.png" 
                  alt="Platão Carnívoro + Testosterona 1k Collaboration" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center shadow-xl">
                      <Handshake className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-gradient-to-r from-brand-brown to-brand-green-gray text-white border-none font-augustus px-4 py-2 text-sm font-bold">
                      <Star className="w-4 h-4 mr-2" />
                      COLABORAÇÃO EXCLUSIVA
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-diogenes font-bold text-white mb-2">
                    <span className="text-brand-lilac">Platão Carnívoro</span> + <span className="text-brand-brown">Testosterona 1k</span>
                  </h2>
                  <p className="text-lg text-white/90 max-w-2xl font-body">
                    Uma parceria única entre duas marcas que compartilham os mesmos valores: <strong>força</strong>, <strong>disciplina</strong> e <strong>transformação</strong>
                  </p>
                </div>
              </div>

              {/* Mobile Banner */}
              <div className="block sm:hidden relative">
                <img 
                  src="/testo1k/bannermobile.png" 
                  alt="Platão Carnívoro + Testosterona 1k Collaboration Mobile" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-xl flex items-center justify-center shadow-lg">
                      <Handshake className="w-4 h-4 text-white" />
                    </div>
                    <Badge className="bg-gradient-to-r from-brand-brown to-brand-green-gray text-white border-none font-augustus px-3 py-1 text-xs font-bold">
                      <Star className="w-3 h-3 mr-1" />
                      COLABORAÇÃO
                    </Badge>
                  </div>
                  <h2 className="text-xl font-diogenes font-bold text-white mb-2">
                    <span className="text-brand-lilac">Platão</span> + <span className="text-brand-brown">Testo1k</span>
                  </h2>
                  <p className="text-sm text-white/90 font-body">
                    Parceria única entre marcas com valores alinhados
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Header for smaller screens */}
          <div className="text-center mb-8 sm:mb-12 sm:hidden">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center shadow-xl">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-brand-brown to-brand-green-gray text-white border-none font-augustus px-4 py-2 text-sm font-bold">
                <Star className="w-4 h-4 mr-2" />
                COLABORAÇÃO EXCLUSIVA
              </Badge>
              <div className="w-12 h-12 bg-gradient-to-br from-brand-green-gray to-brand-brown rounded-2xl flex items-center justify-center shadow-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-diogenes font-bold mb-4 text-foreground">
              <span className="text-brand-brown">Platão Carnívoro</span> + <span className="text-brand-green-gray">Testosterona 1k</span>
            </h2>
            <p className="text-base text-foreground/80 max-w-3xl mx-auto font-body leading-relaxed">
              Uma parceria única entre duas marcas que compartilham os mesmos valores: <strong>força</strong>, <strong>disciplina</strong> e <strong>transformação</strong>
            </p>
          </div>

          {/* Collaboration Content */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left Side - Platão Carnívoro Showcase */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-background/95 to-brand-lilac/5 border-brand-gray-rose/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Brand Banner */}
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <img 
                    src="/testo1k/banner1.png" 
                    alt="Platão Carnívoro Banner" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center shadow-lg p-2">
                        <img 
                          src="/logo-round.png" 
                          alt="Platão Carnívoro" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-diogenes font-bold text-white">
                          PLATÃO CARNÍVORO
                        </h3>
                        <p className="text-sm font-augustus text-white/80">
                          Filosofia, carne e tradição
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
                      <span className="font-body text-foreground/80">Curadoria exclusiva de produtos da Amazon</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
                      <span className="font-body text-foreground/80">Comunidade focada em excelência e autenticidade</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
                      <span className="font-body text-foreground/80">Filosofia clássica aplicada ao mundo moderno</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/">
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-brand-brown bg-brand-brown/5 text-brand-brown hover:bg-brand-brown hover:text-white transition-all duration-300 font-augustus font-semibold shadow-md hover:shadow-lg"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Conhecer a Comunidade
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Testosterona 1k Showcase */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-background/95 to-brand-brown/5 border-brand-gray-rose/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Brand Banner */}
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <img 
                    src="/testo1k/banner2.png" 
                    alt="Testosterona 1k Banner" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-green-gray to-brand-brown rounded-2xl flex items-center justify-center shadow-lg p-2">
                        <img 
                          src="/testo1k/testo1k-logo.png" 
                          alt="Testosterona 1k" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-diogenes font-bold text-white">
                          TESTOSTERONA 1K
                        </h3>
                        <p className="text-sm font-augustus text-white/80">
                          Transformação natural e comprovada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-green-gray rounded-full"></div>
                      <span className="font-body text-foreground/80">Estratégias 100% naturais para aumentar testosterona</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-green-gray rounded-full"></div>
                      <span className="font-body text-foreground/80">Plano diário simples e comprovado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-green-gray rounded-full"></div>
                      <span className="font-body text-foreground/80">Resultados garantidos em energia e vitalidade</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/testo1k/landing">
                      <Button 
                        variant="carnivoro" 
                        className="w-full font-augustus font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Descobrir o Método
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-diogenes font-bold mb-4 text-foreground">
                Por que essa <span className="text-brand-brown">parceria</span> faz sentido?
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <Card className="bg-gradient-to-br from-brand-lilac/10 to-brand-gray-rose/10 border-brand-gray-rose/30 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative h-24 bg-gradient-to-br from-brand-brown/20 to-brand-green-gray/20 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg sm:text-xl font-augustus font-bold mb-3 text-foreground">
                    Valores Alinhados
                  </h4>
                  <p className="text-sm sm:text-base text-brand-green-gray/70 font-body leading-relaxed">
                    Ambas as marcas compartilham o compromisso com excelência, disciplina e transformação pessoal
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-lilac/10 to-brand-gray-rose/10 border-brand-gray-rose/30 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative h-24 bg-gradient-to-br from-brand-green-gray/20 to-brand-brown/20 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-green-gray to-brand-brown rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg sm:text-xl font-augustus font-bold mb-3 text-foreground">
                    Comunidade Unida
                  </h4>
                  <p className="text-sm sm:text-base text-brand-green-gray/70 font-body leading-relaxed">
                    Duas comunidades que buscam o mesmo objetivo: evolução constante e resultados reais
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-lilac/10 to-brand-gray-rose/10 border-brand-gray-rose/30 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative h-24 bg-gradient-to-br from-brand-brown/20 to-brand-green-gray/20 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-xl flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg sm:text-xl font-augustus font-bold mb-3 text-foreground">
                    Qualidade Garantida
                  </h4>
                  <p className="text-sm sm:text-base text-brand-green-gray/70 font-body leading-relaxed">
                    Produtos e métodos testados e aprovados por especialistas em suas respectivas áreas
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Background Banner */}
              <div className="absolute inset-0">
                <img 
                  src="/testo1k/bgtesto-1k.png" 
                  alt="Background" 
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-brown/30 via-brand-green-gray/20 to-brand-lilac/30"></div>
              </div>
              
              <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center shadow-xl">
                    <Handshake className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-brand-brown to-brand-green-gray text-white border-none font-augustus px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">PARCERIA ESTRATÉGICA</span>
                    <span className="sm:hidden">PARCERIA</span>
                  </Badge>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-green-gray to-brand-brown rounded-2xl flex items-center justify-center shadow-xl">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-diogenes font-bold mb-4 text-white text-center">
                  Junte-se à <span className="text-brand-lilac">Revolução</span>
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 font-body max-w-3xl mx-auto text-center px-4">
                  Descubra como a combinação de produtos curados e métodos comprovados pode transformar sua vida
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/" className="w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-brand-brown transition-all duration-300 font-augustus font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl"
                    >
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="hidden sm:inline">Explorar Produtos</span>
                      <span className="sm:hidden">Produtos</span>
                    </Button>
                  </Link>
                  <Link to="/testo1k/landing" className="w-full sm:w-auto">
                    <Button 
                      variant="carnivoro" 
                      className="w-full font-augustus font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="hidden sm:inline">Conhecer Método</span>
                      <span className="sm:hidden">Método</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
