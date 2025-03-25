
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, ClickData, ChartData, AdminStats, Category, Marketplace } from "../types";
import { useToast } from "@/components/ui/use-toast";
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
  
  // Use the filtering hook
  const { 
    filteredProducts, 
    filterByCategory, 
    filterByMarketplace, 
    searchProducts, 
    resetFilters 
  } = useProductFiltering(products);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load products
        const productsData = await fetchProducts();
        setProducts(productsData);
        
        // Load click data
        const clicksData = await fetchClickData();
        setClickData(clicksData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading products.",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);
  
  // Handle product update from realtime
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

  // Handle new click from realtime
  const handleNewClick = useCallback((payload: any) => {
    const newClick: ClickData = {
      productId: payload.new.product_id || "",
      timestamp: new Date(payload.new.timestamp || new Date())
    };
    setClickData(current => [...current, newClick]);
  }, []);

  // Setup realtime updates
  useRealtimeUpdates(handleProductUpdate, handleNewClick);

  // Track product click
  const trackClick = async (productId: string) => {
    try {
      await trackProductClick(productId);
    } catch (error: any) {
      toast({
        title: "Error tracking click",
        description: "There was a problem registering the click.",
        duration: 3000,
      });
    }
  };

  // Get product by ID
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Add a new product
  const addProduct = async (productData: Omit<Product, "id" | "clicks" | "addedAt">) => {
    try {
      const newProduct = await addProductService(productData);
      setProducts(prev => [...prev, newProduct]);
      
      toast({
        title: "Product added",
        description: "The product was added successfully.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast({
        title: "Error adding product",
        description: error.message,
        duration: 3000,
      });
    }
  };

  // Update an existing product
  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
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
        title: "Product updated",
        description: "The product was updated successfully.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast({
        title: "Error updating product",
        description: error.message,
        duration: 3000,
      });
    }
  };

  // Delete a product
  const deleteProduct = async (id: string) => {
    try {
      await deleteProductService(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      
      toast({
        title: "Product removed",
        description: "The product was removed successfully.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error removing product:", error);
      toast({
        title: "Error removing product",
        description: error.message,
        duration: 3000,
      });
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
