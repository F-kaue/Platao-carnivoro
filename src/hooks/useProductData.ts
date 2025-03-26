
import { useState, useEffect, useCallback } from "react";
import { Product, ClickData, Category, Marketplace } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

/**
 * Hook to manage product data filtering
 */
export function useProductFiltering(products: Product[]) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeMarketplace, setActiveMarketplace] = useState<Marketplace | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  return {
    filteredProducts,
    filterByCategory,
    filterByMarketplace,
    searchProducts,
    resetFilters
  };
}

/**
 * Hook to check and monitor authentication status
 */
export function useAuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check current auth status
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Autenticado com sucesso",
            description: "Você agora está conectado.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Desconectado",
            description: "Você foi desconectado do sistema.",
          });
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);
  
  return { isAuthenticated };
}

/**
 * Hook to setup Supabase realtime updates
 */
export function useRealtimeUpdates(
  onProductUpdate: (updatedProduct: any) => void,
  onNewClick: (newClick: any) => void
) {
  useEffect(() => {
    // Setup realtime channel for products
    const productChannel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'products' 
        },
        (payload: any) => {
          console.log('Product updated:', payload);
          onProductUpdate(payload);
        }
      )
      .subscribe();

    // Setup realtime channel for clicks
    const clicksChannel = supabase
      .channel('clicks-changes')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'clicks' 
        },
        (payload: any) => {
          console.log('New click registered:', payload);
          onNewClick(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productChannel);
      supabase.removeChannel(clicksChannel);
    };
  }, [onProductUpdate, onNewClick]);
}
