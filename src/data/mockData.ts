
import { Product, Category, Marketplace } from "../types";

// Function to generate random prices
const generatePrices = () => {
  const originalPrice = Math.floor(Math.random() * 1000) + 50;
  const discount = Math.random() * 0.5; // 0-50% discount
  const salePrice = Math.round(originalPrice * (1 - discount));
  return { originalPrice, salePrice };
};

// Function to generate random dates within the last 30 days
const generateRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - daysAgo);
  return now;
};

// Generate a set of placeholder images for products
const generatePlaceholderImages = (productId: string) => {
  const numImages = Math.floor(Math.random() * 3) + 1; // 1-3 images per product
  return Array.from({ length: numImages }, (_, i) => 
    `https://source.unsplash.com/random/300x300?product=${productId}-${i}`
  );
};

// List of marketplace options
const marketplaces: Marketplace[] = [
  'Amazon', 'Shopee', 'Mercado Livre', 'AliExpress', 'Magalu', 'Americanas', 'Outros'
];

// List of category options
const categories: Category[] = [
  'Eletrônicos', 'Casa e Decoração', 'Moda', 'Beleza', 'Cozinha', 
  'Brinquedos', 'Esportes', 'Livros', 'Pets', 'Outros'
];

// Product title templates
const productTitles = [
  "Smartphone Premium com Câmera de Alta Resolução",
  "Notebook Ultrafino com Processador de Última Geração",
  "Fones de Ouvido Bluetooth com Cancelamento de Ruído",
  "Vestido Elegante para Eventos Especiais",
  "Kit de Maquiagem Profissional com 24 Cores",
  "Panela Elétrica Multifuncional",
  "Brinquedo Educativo para Crianças de 3-6 anos",
  "Tênis Esportivo com Amortecimento Premium",
  "Livro Best-seller Edição Especial",
  "Cama Ortopédica para Pets de Grande Porte",
  "Cafeteira Automática Programável",
  "Liquidificador Potente com 12 Velocidades",
  "Mochila Impermeável com Compartimento para Laptop",
  "Relógio Inteligente com Monitor Cardíaco",
  "Cadeira Ergonômica para Home Office",
  "Aspirador de Pó Robô com Mapeamento Inteligente",
  "Conjunto de Potes Herméticos para Cozinha",
  "Máquina de Lavar Compacta para Apartamentos",
  "Ventilador de Teto com Controle Remoto",
  "Caixa de Som Bluetooth à Prova D'água"
];

// Generate 20 random products
export const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => {
  const id = (i + 1).toString();
  const { originalPrice, salePrice } = generatePrices();
  const marketplace = marketplaces[Math.floor(Math.random() * marketplaces.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const clicks = Math.floor(Math.random() * 100);
  const title = productTitles[i % productTitles.length];
  
  return {
    id,
    title,
    originalPrice,
    salePrice,
    images: generatePlaceholderImages(id),
    marketplace,
    category,
    affiliateLink: `https://example.com/affiliate/${id}`,
    clicks,
    addedAt: generateRandomDate()
  };
});
