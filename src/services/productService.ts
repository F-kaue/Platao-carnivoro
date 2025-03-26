
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Product, Category, Marketplace, ClickData, ChartData, AdminStats } from "@/types";

/**
 * Fetches all products from the database
 */
export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    if (!data) {
      return [];
    }

    // Convert Supabase data to Product format
    return data.map(p => ({
      id: p.id,
      title: p.title,
      originalPrice: p.original_price,
      salePrice: p.sale_price,
      marketplace: p.marketplace as Marketplace,
      category: p.category as Category,
      affiliateLink: p.affiliate_link,
      images: p.images,
      clicks: p.clicks || 0,
      addedAt: new Date(p.added_at || new Date())
    }));
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    toast({
      title: "Erro ao carregar produtos",
      description: "Verifique sua conexão com o servidor.",
      variant: "destructive"
    });
    return [];
  }
}

/**
 * Fetches all click data from the database
 */
export async function fetchClickData() {
  try {
    const { data, error } = await supabase
      .from('clicks')
      .select('*');

    if (error) {
      console.error("Error fetching click data:", error);
      throw error;
    }

    if (!data) {
      return [];
    }

    // Convert to ClickData format
    return data.map(click => ({
      productId: click.product_id || "",
      timestamp: new Date(click.timestamp || new Date())
    }));
  } catch (error) {
    console.error("Error in fetchClickData:", error);
    toast({
      title: "Erro ao carregar dados de cliques",
      description: "Verifique sua conexão com o servidor.",
      variant: "destructive" 
    });
    return [];
  }
}

/**
 * Tracks a click on a product
 */
export async function trackProductClick(productId: string) {
  try {
    // 1. Register click in clicks table
    const { error: clickError } = await supabase
      .from('clicks')
      .insert({ product_id: productId });

    if (clickError) {
      throw new Error(clickError.message);
    }

    // 2. First get current click count
    const { data: productData, error: getError } = await supabase
      .from('products')
      .select('clicks')
      .eq('id', productId)
      .single();
      
    if (getError) {
      console.error("Error getting current click count:", getError);
      throw new Error(getError.message);
    }
    
    // 3. Update clicks count in products table
    const currentClicks = productData?.clicks || 0;
    const { error: updateError } = await supabase
      .from('products')
      .update({ clicks: currentClicks + 1 })
      .eq('id', productId);
      
    if (updateError) {
      console.error("Error incrementing clicks:", updateError);
      throw new Error(updateError.message);
    }

  } catch (error: any) {
    console.error("Error processing click:", error);
    toast({
      title: "Erro ao registrar clique",
      description: error.message || "Verifique sua conexão com o servidor",
      variant: "destructive"
    });
    throw error;
  }
}

/**
 * Adds a new product to the database
 */
export async function addProduct(productData: Omit<Product, "id" | "clicks" | "addedAt">) {
  try {
    console.log("Adding product with data:", productData);
    
    // Verify authentication status
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      console.error("No Supabase session found. Attempting to authenticate...");
      
      // Try to authenticate with Supabase if localStorage has isLoggedIn = true
      if (localStorage.getItem("isLoggedIn") === "true") {
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: "achadinhos@admin.com",
            password: "0956kaue",
          });
          
          if (error) {
            console.error("Error authenticating with Supabase:", error);
            toast({
              title: "Erro de autenticação",
              description: "Falha ao autenticar com o Supabase. Tente fazer logout e login novamente.",
              variant: "destructive"
            });
            throw new Error("Falha na autenticação");
          }
          
          console.log("Successfully authenticated with Supabase");
        } catch (authError) {
          console.error("Exception during Supabase authentication:", authError);
          toast({
            title: "Erro de autenticação",
            description: "Não foi possível autenticar com o Supabase. Tente fazer logout e login novamente.",
            variant: "destructive"
          });
          throw new Error("Falha na autenticação");
        }
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para adicionar produtos",
          variant: "destructive"
        });
        throw new Error("Autenticação necessária para adicionar produtos");
      }
    }
    
    // Proceed with adding the product
    const { data, error } = await supabase
      .from('products')
      .insert({
        title: productData.title,
        original_price: productData.originalPrice,
        sale_price: productData.salePrice,
        marketplace: productData.marketplace,
        category: productData.category,
        affiliate_link: productData.affiliateLink,
        images: productData.images,
        clicks: 0
      })
      .select();
      
    if (error) {
      console.error("Error adding product:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error("Nenhum dado retornado após adicionar produto");
    }
    
    // Convert to Product format
    return {
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
  } catch (error: any) {
    console.error("Error in addProduct:", error);
    toast({
      title: "Erro ao adicionar produto",
      description: error.message || "Verifique se você está autenticado e tente novamente",
      variant: "destructive"
    });
    throw error;
  }
}

/**
 * Updates an existing product
 */
export async function updateProduct(id: string, updates: Partial<Product>) {
  try {
    // Validate auth state before attempting to update
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      // If there's no Supabase session but we're logged in via localStorage, try to signin
      if (localStorage.getItem("isLoggedIn") === "true") {
        try {
          await supabase.auth.signInWithPassword({
            email: "achadinhos@admin.com",
            password: "0956kaue",
          });
        } catch (authError) {
          console.error("Error authenticating with Supabase:", authError);
          toast({
            title: "Erro de autenticação",
            description: "Não foi possível autenticar com o Supabase. Tente fazer logout e login novamente.",
            variant: "destructive"
          });
          throw new Error("Authentication failed");
        }
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para atualizar produtos",
          variant: "destructive"
        });
        throw new Error("Authentication required to update products");
      }
    }
    
    // Convert to database format
    const dbUpdates: any = {};
    if (updates.title) dbUpdates.title = updates.title;
    if (updates.originalPrice !== undefined) dbUpdates.original_price = updates.originalPrice;
    if (updates.salePrice !== undefined) dbUpdates.sale_price = updates.salePrice;
    if (updates.marketplace) dbUpdates.marketplace = updates.marketplace;
    if (updates.category) dbUpdates.category = updates.category;
    if (updates.affiliateLink) dbUpdates.affiliate_link = updates.affiliateLink;
    if (updates.images) dbUpdates.images = updates.images;
    
    const { error } = await supabase
      .from('products')
      .update(dbUpdates)
      .eq('id', id);
      
    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  } catch (error: any) {
    console.error("Error in updateProduct:", error);
    toast({
      title: "Erro ao atualizar produto",
      description: error.message || "Verifique se você está autenticado e tente novamente",
      variant: "destructive"
    });
    throw error;
  }
}

/**
 * Deletes a product by ID
 */
export async function deleteProduct(id: string) {
  try {
    // Validate auth state before attempting to delete
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      // If there's no Supabase session but we're logged in via localStorage, try to signin
      if (localStorage.getItem("isLoggedIn") === "true") {
        try {
          await supabase.auth.signInWithPassword({
            email: "achadinhos@admin.com",
            password: "0956kaue",
          });
        } catch (authError) {
          console.error("Error authenticating with Supabase:", authError);
          toast({
            title: "Erro de autenticação",
            description: "Não foi possível autenticar com o Supabase. Tente fazer logout e login novamente.",
            variant: "destructive"
          });
          throw new Error("Authentication failed");
        }
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para remover produtos",
          variant: "destructive"
        });
        throw new Error("Authentication required to delete products");
      }
    }
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error("Error removing product:", error);
      throw error;
    }
  } catch (error: any) {
    console.error("Error in deleteProduct:", error);
    toast({
      title: "Erro ao remover produto",
      description: error.message || "Verifique se você está autenticado e tente novamente",
      variant: "destructive"
    });
    throw error;
  }
}

/**
 * Calculates admin statistics
 */
export function calculateAdminStats(products: Product[], clickData: ClickData[]): AdminStats {
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
}
