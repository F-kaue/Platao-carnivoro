
import { createContext, useContext, useState, useEffect } from "react";
import { Product, ClickData, ChartData, AdminStats, Category, Marketplace } from "../types";
import { useToast } from "@/components/ui/use-toast";

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

  // Initialize with mock data
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // In a real implementation, this would fetch from an API
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        
        // Simulate loading
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        
        // Load click data from localStorage
        const savedClickData = localStorage.getItem("clickData");
        if (savedClickData) {
          setClickData(JSON.parse(savedClickData));
        }
      } catch (error) {
        console.error("Failed to load products:", error);
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

  // Save click data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("clickData", JSON.stringify(clickData));
  }, [clickData]);

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

  const trackClick = (productId: string) => {
    // Record the click
    const newClickData: ClickData = {
      productId,
      timestamp: new Date(),
    };
    
    setClickData(prev => [...prev, newClickData]);
    
    // Update product click count
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, clicks: product.clicks + 1 } 
          : product
      )
    );
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const addProduct = (productData: Omit<Product, "id" | "clicks" | "addedAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      clicks: 0,
      addedAt: new Date(),
    };
    
    setProducts(prev => [...prev, newProduct]);
    toast({
      title: "Produto adicionado",
      description: "O produto foi adicionado com sucesso.",
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
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
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast({
      title: "Produto removido",
      description: "O produto foi removido com sucesso.",
    });
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
