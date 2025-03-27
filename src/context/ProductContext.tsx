import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, ClickData, ChartData, AdminStats, Category, Marketplace } from "../types";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchProducts, 
  fetchClickData, 
  trackProductClick, 
  addProduct as addProductService, 
  updateProduct as updateProductService, 
  deleteProduct as deleteProductService,
  calculateAdminStats
} from "@/services/productService";
import { useProductFiltering, useRealtimeUpdates } from "@/hooks/useProductData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

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
  const [isLoading, setIsLoading] = useState(true);
  const [clickData, setClickData] = useState<ClickData[]>([]);
  const { toast } = useToast();
  const { isLoggedIn } = useAuth();
  
  // Use the filtering hook
  const { 
    filteredProducts, 
    filterByCategory, 
    filterByMarketplace, 
    searchProducts, 
    resetFilters 
  } = useProductFiltering(products);

  // Simplified authentication check (only localStorage)
  const ensureAuthenticated = useCallback(async () => {
    return localStorage.getItem("isLoggedIn") === "true";
  }, []);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Always try to load products for public viewing
        const productsData = await fetchProducts();
        setProducts(productsData);
        
        // Check authentication before loading click data
        const isAuthenticated = await ensureAuthenticated();
        if (isAuthenticated) {
          // Load click data if authenticated
          const clicksData = await fetchClickData();
          setClickData(clicksData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Houve um problema ao carregar os produtos.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast, ensureAuthenticated]);
  
  // Lidar com atualização de produto em tempo real
  const handleProductUpdate = useCallback((payload: any) => {
    setProducts(currentProducts => 
      currentProducts.map(product => 
        product.id === payload.new.id
          ? {
              ...product,
              clicks: payload.new.clicks,
            }
          : product
      )
    );
  }, []);

  // Lidar com novo clique em tempo real
  const handleNewClick = useCallback((payload: any) => {
    const newClick: ClickData = {
      productId: payload.new.product_id || "",
      timestamp: new Date(payload.new.timestamp || new Date())
    };
    setClickData(current => [...current, newClick]);
  }, []);

  // Configurar atualizações em tempo real
  useRealtimeUpdates(handleProductUpdate, handleNewClick);

  // Track product click
  const trackClick = async (productId: string) => {
    try {
      await trackProductClick(productId);
    } catch (error: any) {
      // Error is already handled in the service
      console.error("Erro em trackClick:", error);
    }
  };

  // Get product by ID
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Add a new product (simplified authentication check)
  const addProduct = async (productData: Omit<Product, "id" | "clicks" | "addedAt">) => {
    try {
      // Check authentication first (via localStorage only)
      const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
      if (!isAuthenticated) {
        toast({
          title: "Autenticação necessária",
          description: "Você precisa estar logado para adicionar produtos.",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Autenticação local confirmada, adicionando produto:", productData);
      const newProduct = await addProductService(productData);
      setProducts(prev => [...prev, newProduct]);
      
      toast({
        title: "Produto adicionado",
        description: "O produto foi adicionado com sucesso.",
        duration: 3000,
      });
    } catch (error: any) {
      // Error is already handled in the service
      console.error("Erro em addProduct context:", error);
    }
  };

  // Update an existing product (simplified authentication check)
  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      // Check auth first (via localStorage only)
      const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
      if (!isAuthenticated) {
        toast({
          title: "Autenticação necessária",
          description: "Você precisa estar logado para atualizar produtos.",
          variant: "destructive",
        });
        return;
      }
      
      await updateProductService(id, updates);
      
      // Update local state
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
        duration: 3000,
      });
    } catch (error: any) {
      // Error is already handled in the service
      console.error("Erro em updateProduct context:", error);
    }
  };

  // Delete a product (simplified authentication check)
  const deleteProduct = async (id: string) => {
    try {
      // Check auth first (via localStorage only)
      const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
      if (!isAuthenticated) {
        toast({
          title: "Autenticação necessária",
          description: "Você precisa estar logado para remover produtos.",
          variant: "destructive",
        });
        return;
      }
      
      await deleteProductService(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      
      toast({
        title: "Produto removido",
        description: "O produto foi removido com sucesso.",
        duration: 3000,
      });
    } catch (error: any) {
      // Error is already handled in the service
      console.error("Erro em deleteProduct context:", error);
    }
  };

  // Get admin statistics
  const getAdminStats = () => {
    return calculateAdminStats(products, clickData);
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
