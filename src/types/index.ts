
export interface Product {
  id: string;
  title: string;
  originalPrice: number;
  salePrice: number;
  images: string[];
  marketplace: Marketplace;
  category: Category;
  affiliateLink: string;
  clicks: number;
  addedAt: Date;
}

export type Marketplace = 'Amazon' | 'Shopee' | 'Mercado Livre' | 'AliExpress' | 'Magalu' | 'Americanas' | 'Outros';

export type Category = 'Eletrônicos' | 'Casa e Decoração' | 'Moda' | 'Beleza' | 'Cozinha' | 'Brinquedos' | 'Esportes' | 'Livros' | 'Pets' | 'Outros';

export interface ClickData {
  productId: string;
  timestamp: Date;
}

export interface ChartData {
  date: string;
  clicks: number;
}

export interface AdminStats {
  totalProducts: number;
  totalClicks: number;
  averageClicksPerProduct: number;
  chartData: ChartData[];
  topProducts: Product[];
}
