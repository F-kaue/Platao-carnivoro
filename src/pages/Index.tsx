
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterSection } from "@/components/FilterSection";
import { PopularProducts } from "@/components/PopularProducts";

const Index = () => {
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
        
        {/* Community Section */}
        <section id="comunidade" className="py-20 bg-gradient-to-br from-brand-lilac/20 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-diogenes font-bold mb-8 text-foreground">
                Junte-se ao Movimento
              </h2>
              <p className="text-xl font-augustus mb-12 text-foreground/70">
                Faça parte de uma comunidade que valoriza os princípios clássicos e a busca pela excelência
              </p>
              
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-gray-rose/30 shadow-xl">
                <h3 className="text-2xl font-augustus font-bold mb-6 text-primary">
                  Transforme sua vida com os valores eternos
                </h3>
                <p className="text-lg font-body mb-8 text-foreground/80">
                  Receba curadoria exclusiva, conteúdo filosófico e acesso antecipado aos melhores produtos
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-augustus font-semibold text-lg transition-all hover:scale-105 shadow-lg">
                    Entrar na Revolução
                  </button>
                  <button className="border-2 border-primary/30 text-primary hover:bg-primary/10 px-8 py-4 rounded-full font-augustus font-semibold text-lg transition-all">
                    Saber Mais
                  </button>
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
