
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterSection } from "@/components/FilterSection";
import { PopularProducts } from "@/components/PopularProducts";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-950/20 dark:to-transparent">
          <div className="container mx-auto">
            <PopularProducts />
          </div>
        </section>
        
        <section id="products" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Todas as Ofertas</h2>
                <FilterSection />
              </div>
              
              <ProductGrid />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
