
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/context/ProductContext";

export function ProductGrid() {
  const { filteredProducts, isLoading } = useProducts();

  if (isLoading) {
    // Show skeleton cards while loading
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-square rounded-md" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-full mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-2xl font-semibold mb-2">Nenhum produto encontrado</h3>
        <p className="text-muted-foreground">
          Tente ajustar seus filtros ou buscar por outro termo.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
