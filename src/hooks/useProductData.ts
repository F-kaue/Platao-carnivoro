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
 * Hook to check and monitor authentication status (simplified to use only localStorage)
 */
export function useAuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check only localStorage for auth
    const checkAuth = () => {
      try {
        const localAuth = localStorage.getItem("isLoggedIn") === "true";
        setIsAuthenticated(localAuth);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
    
    // Set up a listener for storage changes (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isLoggedIn") {
        setIsAuthenticated(e.newValue === "true");
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
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
