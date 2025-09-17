
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterSection } from "@/components/FilterSection";
import { PopularProducts } from "@/components/PopularProducts";
import { NewsletterSection } from "@/components/NewsletterSection";
import { usePublicLinks } from "@/hooks/usePublicLinks";

const Index = () => {
  const { getInstagramUrl } = usePublicLinks();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Products Section */}
        <section id="produtos" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-diogenes font-bold mb-4 text-foreground">
                Curadoria <span className="text-primary">Carnívora</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-body">
                Produtos cuidadosamente selecionados que refletem os valores de força, disciplina e autenticidade
              </p>
            </div>
            
            <PopularProducts />
            
            <div className="mt-16">
              <div className="mb-8">
                <FilterSection />
              </div>
              <ProductGrid />
            </div>
          </div>
        </section>
        
        {/* Philosophy Section */}
        <section id="filosofia" className="py-20 bg-brand-dark dark:bg-brand-green-gray text-brand-lilac">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-diogenes font-bold mb-8">
                A Filosofia Platão Carnívoro
              </h2>
              <p className="text-xl font-augustus mb-12 leading-relaxed">
                "Conhece-te a ti mesmo" - Sócrates. Nossa curadoria reflete os valores eternos da filosofia clássica 
                aplicados ao mundo moderno, buscando produtos que fortalecem corpo, mente e caráter.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">Φ</span>
                  </div>
                  <h3 className="text-xl font-augustus font-semibold mb-3">Sabedoria</h3>
                  <p className="font-body text-brand-gray-rose">
                    Produtos que cultivam conhecimento e reflexão
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">💪</span>
                  </div>
                  <h3 className="text-xl font-augustus font-semibold mb-3">Força</h3>
                  <p className="font-body text-brand-gray-rose">
                    Itens que promovem vigor físico e mental
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">⚖️</span>
                  </div>
                  <h3 className="text-xl font-augustus font-semibold mb-3">Disciplina</h3>
                  <p className="font-body text-brand-gray-rose">
                    Ferramentas para uma vida regrada e virtuosa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <NewsletterSection />
        
        {/* Contact Section */}
        <section id="contato" className="py-20 bg-gradient-to-br from-brand-lilac/20 via-brand-gray-rose/10 to-brand-brown/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-diogenes font-bold mb-6 text-foreground">
                  Junte-se à Revolução
              </h2>
                <p className="text-xl font-augustus text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                  Filosofia, carne e tradição. Siga nossa jornada de <strong>despertar</strong> e <strong>transformação</strong> através do Instagram.
                </p>
              </div>

              {/* Main Contact Card */}
              <div className="bg-background/95 backdrop-blur-md rounded-3xl border border-brand-gray-rose/30 shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  
                  {/* Left Side - Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="space-y-8">
                      
                      {/* Instagram Connection */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center shadow-lg p-2">
                          <img 
                            src="/logo-round.png" 
                            alt="Platão Carnívoro" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-diogenes font-bold text-foreground">
                            @plataocarnivoro
                </h3>
                          <p className="text-brand-green-gray/70 font-body">
                            Filosofia, carne e tradição
                          </p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-4">
                        <h4 className="text-xl font-augustus font-semibold text-brand-green-gray">
                          Conteúdo que transforma:
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
                            <span className="font-body text-foreground/80">Reflexões filosóficas sobre vida e tradição</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
                            <span className="font-body text-foreground/80">Despertar sobre questões importantes da vida</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
                            <span className="font-body text-foreground/80">Curadoria de produtos que fortalecem corpo e mente</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
                            <span className="font-body text-foreground/80">Comunidade de pessoas que buscam excelência</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button 
                        onClick={() => window.open(getInstagramUrl(), "_blank")}
                        className="w-full bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white px-8 py-4 rounded-2xl font-augustus font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <img 
                            src="/logo-round.png" 
                            alt="Platão Carnívoro" 
                            className="w-6 h-6 object-contain"
                          />
                          <span>Seguir e juntar-se à revolução</span>
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                  </button>
                    </div>
                  </div>

                  {/* Right Side - Visual */}
                  <div className="relative bg-gradient-to-br from-brand-brown/10 via-brand-gray-rose/5 to-brand-lilac/10 p-8 md:p-12 flex items-center justify-center">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-pink-500/20 rounded-full blur-2xl"></div>
                    </div>

                    {/* Instagram Preview */}
                    <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full">
                      <div className="space-y-4">
                        {/* Instagram Header */}
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                          <div className="w-10 h-10 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-full flex items-center justify-center p-1">
                            <img 
                              src="/logo-round.png" 
                              alt="Platão Carnívoro" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-augustus font-semibold text-sm">plataocarnivoro</p>
                            <p className="text-xs text-gray-500 font-body">Filosofia, carne e tradição</p>
                          </div>
                        </div>

                        {/* Content Preview */}
                        <div className="space-y-3">
                          <div className="h-40 bg-gradient-to-br from-brand-brown/20 to-brand-green-gray/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="text-center relative z-10">
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 p-2">
                                <img 
                                  src="/logo-round.png" 
                                  alt="Platão Carnívoro" 
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <p className="text-sm font-augustus text-white">Despertar</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-augustus font-semibold text-foreground">
                              Reflexões que transformam
                            </p>
                            <p className="text-xs font-body text-gray-600 leading-relaxed">
                              Conteúdo filosófico sobre vida, tradição e despertar. Questões importantes que fazem você pensar e evoluir.
                            </p>
                          </div>
                        </div>

                        {/* Engagement */}
                        <div className="flex items-center justify-between pt-3">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                              <span className="text-xs font-body text-gray-500">53.8k</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                              <span className="text-xs font-body text-gray-500">77</span>
                            </div>
                          </div>
                          <span className="text-xs font-body text-gray-400">há 1h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
