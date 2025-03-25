
import { createContext, useContext, useState, useEffect } from "react";
import { Product, ClickData, ChartData, AdminStats, Category, Marketplace } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Mock data for initial development
import { mockProducts } from "../data/mockData";

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  filterByCategory: (category: Category | null) => void;
  filterByMarketplace: (marketplace: Marketplace | null) => void;
  searchProducts: (query: string) => void;
  trackClick: (productId: string) => void;
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, "id" | "clicks" | "addedAt">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getAdminStats: () => AdminStats;
  resetFilters: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clickData, setClickData] = useState<ClickData[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeMarketplace, setActiveMarketplace] = useState<Marketplace | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Initialize with data from Supabase or mock data
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Tentar buscar produtos do Supabase
        const { data: supabaseProducts, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          console.error("Erro ao buscar produtos do Supabase:", error);
          // Fallback para dados mock
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
        } else if (supabaseProducts && supabaseProducts.length > 0) {
          // Converter os dados do Supabase para o formato esperado
          const formattedProducts: Product[] = supabaseProducts.map(product => ({
            id: product.id,
            title: product.title,
            originalPrice: product.original_price,
            salePrice: product.sale_price,
            marketplace: product.marketplace as Marketplace,
            category: product.category as Category,
            affiliateLink: product.affiliate_link,
            images: product.images,
            clicks: product.clicks || 0,
            addedAt: new Date(product.added_at || new Date())
          }));
          
          setProducts(formattedProducts);
          setFilteredProducts(formattedProducts);
        } else {
          // Se não houver produtos no Supabase, usar dados mock
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
        }
        
        // Buscar dados de cliques do Supabase
        const { data: supabaseClicks, error: clicksError } = await supabase
          .from('clicks')
          .select('*');
          
        if (!clicksError && supabaseClicks) {
          const formattedClicks: ClickData[] = supabaseClicks.map(click => ({
            productId: click.product_id || "",
            timestamp: new Date(click.timestamp || new Date())
          }));
          
          setClickData(formattedClicks);
        }
        
        // Simular loading
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error("Falha ao carregar produtos:", error);
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let result = [...products];
    
    if (activeCategory) {
      result = result.filter(product => product.category === activeCategory);
    }
    
    if (activeMarketplace) {
      result = result.filter(product => product.marketplace === activeMarketplace);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.marketplace.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [products, activeCategory, activeMarketplace, searchQuery]);

  const filterByCategory = (category: Category | null) => {
    setActiveCategory(category);
  };

  const filterByMarketplace = (marketplace: Marketplace | null) => {
    setActiveMarketplace(marketplace);
  };

  const searchProducts = (query: string) => {
    setSearchQuery(query);
  };

  const resetFilters = () => {
    setActiveCategory(null);
    setActiveMarketplace(null);
    setSearchQuery("");
  };

  // Função de rastreamento de cliques atualizada para usar o Supabase
  const trackClick = async (productId: string) => {
    try {
      // 1. Registrar o clique na tabela 'clicks'
      const { error: clickInsertError } = await supabase
        .from('clicks')
        .insert([{ product_id: productId }]);
        
      if (clickInsertError) {
        console.error("Erro ao registrar clique:", clickInsertError);
        // Fallback para armazenamento local em caso de erro
        const newClickData: ClickData = {
          productId,
          timestamp: new Date(),
        };
        setClickData(prev => [...prev, newClickData]);
      } else {
        // Adicionar à lista local se inserção for bem-sucedida
        const newClickData: ClickData = {
          productId,
          timestamp: new Date(),
        };
        setClickData(prev => [...prev, newClickData]);
        
        // 2. Atualizar o contador de cliques no produto
        const { error: updateError } = await supabase
          .from('products')
          .update({ clicks: (products.find(p => p.id === productId)?.clicks || 0) + 1 })
          .eq('id', productId);
          
        if (updateError) {
          console.error("Erro ao atualizar contador de cliques:", updateError);
          // Atualizações locais em caso de erro
          setProducts(prev => 
            prev.map(product => 
              product.id === productId 
                ? { ...product, clicks: product.clicks + 1 } 
                : product
            )
          );
        } else {
          // Atualizar também o estado local
          setProducts(prev => 
            prev.map(product => 
              product.id === productId 
                ? { ...product, clicks: product.clicks + 1 } 
                : product
            )
          );
        }
      }
    } catch (error) {
      console.error("Erro ao processar clique:", error);
      
      // Fallback para comportamento anterior
      const newClickData: ClickData = {
        productId,
        timestamp: new Date(),
      };
      
      setClickData(prev => [...prev, newClickData]);
      setProducts(prev => 
        prev.map(product => 
          product.id === productId 
            ? { ...product, clicks: product.clicks + 1 } 
            : product
        )
      );
    }
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Funções CRUD atualizadas para usar o Supabase
  const addProduct = async (productData: Omit<Product, "id" | "clicks" | "addedAt">) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          title: productData.title,
          original_price: productData.originalPrice,
          sale_price: productData.salePrice,
          marketplace: productData.marketplace,
          category: productData.category,
          affiliate_link: productData.affiliateLink,
          images: productData.images,
          clicks: 0
        }])
        .select();
        
      if (error) {
        console.error("Erro ao adicionar produto:", error);
        toast({
          title: "Erro ao adicionar produto",
          description: error.message,
        });
        
        // Fallback para comportamento anterior
        const newProduct: Product = {
          ...productData,
          id: Date.now().toString(),
          clicks: 0,
          addedAt: new Date(),
        };
        
        setProducts(prev => [...prev, newProduct]);
      } else if (data && data[0]) {
        // Converter o produto retornado para o formato esperado
        const newProduct: Product = {
          id: data[0].id,
          title: data[0].title,
          originalPrice: data[0].original_price,
          salePrice: data[0].sale_price,
          marketplace: data[0].marketplace as Marketplace,
          category: data[0].category as Category,
          affiliateLink: data[0].affiliate_link,
          images: data[0].images,
          clicks: data[0].clicks || 0,
          addedAt: new Date(data[0].added_at || new Date()),
        };
        
        setProducts(prev => [...prev, newProduct]);
        toast({
          title: "Produto adicionado",
          description: "O produto foi adicionado com sucesso.",
        });
      }
    } catch (error: any) {
      console.error("Erro ao adicionar produto:", error);
      toast({
        title: "Erro ao adicionar produto",
        description: error.message,
      });
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      // Converter para o formato do banco de dados
      const dbUpdates: any = {};
      if (updates.title) dbUpdates.title = updates.title;
      if (updates.originalPrice) dbUpdates.original_price = updates.originalPrice;
      if (updates.salePrice) dbUpdates.sale_price = updates.salePrice;
      if (updates.marketplace) dbUpdates.marketplace = updates.marketplace;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.affiliateLink) dbUpdates.affiliate_link = updates.affiliateLink;
      if (updates.images) dbUpdates.images = updates.images;
      
      const { error } = await supabase
        .from('products')
        .update(dbUpdates)
        .eq('id', id);
        
      if (error) {
        console.error("Erro ao atualizar produto:", error);
        toast({
          title: "Erro ao atualizar produto",
          description: error.message,
        });
      } else {
        // Atualizar o estado local
        setProducts(prev => 
          prev.map(product => 
            product.id === id 
              ? { ...product, ...updates } 
              : product
          )
        );
        
        toast({
          title: "Produto atualizado",
          description: "O produto foi atualizado com sucesso.",
        });
      }
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error);
      toast({
        title: "Erro ao atualizar produto",
        description: error.message,
      });
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error("Erro ao remover produto:", error);
        toast({
          title: "Erro ao remover produto",
          description: error.message,
        });
      } else {
        setProducts(prev => prev.filter(product => product.id !== id));
        toast({
          title: "Produto removido",
          description: "O produto foi removido com sucesso.",
        });
      }
    } catch (error: any) {
      console.error("Erro ao remover produto:", error);
      toast({
        title: "Erro ao remover produto",
        description: error.message,
      });
    }
  };

  const getAdminStats = (): AdminStats => {
    const totalProducts = products.length;
    const totalClicks = clickData.length;
    const averageClicksPerProduct = totalProducts > 0 
      ? totalClicks / totalProducts 
      : 0;
    
    // Generate chart data for the last 7 days
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });
    
    const chartData: ChartData[] = last7Days.map(dateStr => {
      const clicksOnDay = clickData.filter(click => 
        new Date(click.timestamp).toISOString().split('T')[0] === dateStr
      ).length;
      
      return {
        date: dateStr,
        clicks: clicksOnDay,
      };
    });
    
    // Get top 5 products by clicks
    const topProducts = [...products]
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);
    
    return {
      totalProducts,
      totalClicks,
      averageClicksPerProduct,
      chartData,
      topProducts,
    };
  };

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      isLoading,
      filterByCategory,
      filterByMarketplace,
      searchProducts,
      trackClick,
      getProductById,
      addProduct,
      updateProduct,
      deleteProduct,
      getAdminStats,
      resetFilters,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
