
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Product, Category, Marketplace, ClickData, ChartData, AdminStats } from "@/types";

/**
 * Fetches all products from the database
 */
export async function fetchProducts() {
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
}

/**
 * Fetches all click data from the database
 */
export async function fetchClickData() {
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
    throw error;
  }
}

/**
 * Adds a new product to the database
 */
export async function addProduct(productData: Omit<Product, "id" | "clicks" | "addedAt">) {
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
    throw new Error("No data returned after adding product");
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
}

/**
 * Updates an existing product
 */
export async function updateProduct(id: string, updates: Partial<Product>) {
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
}

/**
 * Deletes a product by ID
 */
export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error("Error removing product:", error);
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
