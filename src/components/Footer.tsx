
import { Heart } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Logo />
            <p className="text-sm text-muted-foreground mt-1">
              Descubra os melhores produtos com descontos imperdíveis
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Categorias</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Eletrônicos</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Casa e Decoração</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Moda</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Beleza</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Cozinha</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Esportes</a>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Lojas</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Amazon</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Shopee</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Mercado Livre</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">AliExpress</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Magalu</a>
                <a href="/#" className="text-sm text-muted-foreground hover:text-purple-500 transition-colors">Americanas</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {currentYear} Achadinhos. Todos os direitos reservados.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Feito com <Heart className="h-4 w-4 mx-1 text-red-500" /> para nossos clientes
          </p>
        </div>
      </div>
    </footer>
  );
}
