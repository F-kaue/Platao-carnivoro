
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Logo } from "./Logo";
import { useProducts } from "@/context/ProductContext";
import { Category } from "@/types";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { filterByCategory, products } = useProducts();
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);

  // Get unique categories from products
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
    setAvailableCategories(uniqueCategories.sort());
  }, [products]);

  const handleCategoryClick = (category: Category) => {
    // Filtrar por categoria
    filterByCategory(category);
    
    // Scroll para a seção de produtos
    const productsSection = document.getElementById("produtos");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-brand-lilac/20 via-brand-gray-rose/10 to-brand-brown/20 border-t border-brand-gray-rose/30">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
          <div className="w-full lg:w-auto">
            <Logo size="lg" variant="text" />
            <p className="text-sm text-brand-green-gray/80 mt-3 font-body max-w-md">
              Uma curadoria exclusiva de produtos da Amazon para quem valoriza força, disciplina e autenticidade. 
              Descubra itens selecionados que refletem os valores clássicos em um mundo moderno.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-16 w-full lg:w-auto">
            <div className="flex flex-col gap-3">
              <h3 className="font-augustus font-semibold text-brand-green-gray">Categorias</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {availableCategories.map((category) => (
                  <button 
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="text-sm text-brand-green-gray/70 hover:text-brand-brown transition-colors font-body text-left hover:underline"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <h3 className="font-augustus font-semibold text-brand-green-gray">Parceria</h3>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <span className="text-sm text-brand-green-gray/70 font-body">Amazon Brasil</span>
                </div>
                <p className="text-xs text-brand-green-gray/60 font-body max-w-32">
                  Produtos selecionados com qualidade garantida
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-gray-rose/30 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-brand-green-gray/60 gap-4 sm:gap-0">
          <p className="font-body text-center sm:text-left">© {currentYear} PLATÃO CARNÍVORO. Todos os direitos reservados.</p>
          <p className="flex items-center font-body text-center sm:text-right">
            Feito com <Heart className="h-4 w-4 mx-1 text-brand-brown" /> para quem valoriza autenticidade
          </p>
        </div>
      </div>
    </footer>
  );
}
